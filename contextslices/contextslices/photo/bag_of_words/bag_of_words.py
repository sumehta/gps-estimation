#!/usr/bin/env python
import numpy as np
import cv2
import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "contextslices.settings")
from django.conf import settings
from sklearn.cluster import MiniBatchKMeans

class BagOfWords(object):
    """
    Computes image feature histograms based on the feature specified.
    Available features are SURF, color-histogram.
    """
    def __init__(self, feature_name='SIFT', feature_file=''):
        """
        :param feature_name: The type of features to use to compute image histograms
        :param feature_file: Optionally provide file with pre-extracted features
        :return:
        """
        self.feature_name = feature_name
        self.feature_file = feature_file
        self.centers = []
        self.labels = []
        self.mbkms = None
        self.img = None

    def cluster(self, write_to_file=True, centers=1400, input_feature=None):
        """

        :param write_to_file: If write_to_file is true the computed cluster centers and labels will be
         written to a text file
        :param centers: Number of cluster centers
        :return:
        """
        self.mbkms = MiniBatchKMeans(n_clusters=centers)
        features = open('media/sift2.txt')

        new_data = np.loadtxt(features, dtype=(np.string_, np.float_))
        data = np.delete(new_data, 0, 1)

        self.mbkms.fit_predict(data)
        self.centers = self.mbkms.cluster_centers_
        self.labels = self.mbkms.labels_
        labels = self.mbkms.predict(input_feature)
        if write_to_file:
            np.savetxt('media/centers.txt', self.centres)
            np.savetxt('media/labels.txt', self.labels)
        return labels

    def extract_features(self, image_name):
        image_path = settings.MEDIA_ROOT + '/documents/' + image_name
        if self.feature_name == 'SIFT':
            self.img = cv2.imread(image_path)
            self.img = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)
            s = cv2.SURF(300, extended=True)
            kp = s.detect(self.img)
            kp, feat = s.compute(self.img, kp)
            self.key_points = kp
            self.image_features = feat
            return self.image_features

    def compute_image_histogram(self, feature_labels=None, image_name='', feature_type='SIFT'):
        if feature_type == 'color':
            image_path = settings.MEDIA_ROOT + '/documents/' + image_name
            img = cv2.imread(image_path)
            hist1 = cv2.calcHist([img], [0], None, [60], [0, 256])
            hist2 = cv2.calcHist([img], [1], None, [60], [0, 256])
            hist3 = cv2.calcHist([img], [2], None, [60], [0, 256])
            hist = np.concatenate((hist1, hist2, hist3))
            return hist.transpose()

        elif feature_type == 'GIST':
                image_names = open('media/image_names.txt')
                names = np.genfromtxt(image_names, dtype=str)
                gist_vectors = open('media/gist.txt')
                img_hist = np.genfromtxt(gist_vectors, dtype=str)
                for i in range(len(names)):
                    if names[i] == image_name:
                        return np.array(img_hist[i].split(','), dtype=float)
                return []
        else:
            histograms = open('media/image_histogram.txt')
            img_hists = np.genfromtxt(histograms, dtype=str)
            print img_hists
            for i in range(img_hists.shape[0]):
                if img_hists[i, 0] == image_name:
                    print i
                    return img_hists[i, 1:]
            return []

    def compute_class_label(self, features, centers=None):
        """
        Given the features of an image computes euclidean distance from cluster centers
         and assigns a label to each feature
        :param features: A matrix containing features of an image
        :param image:
        :param centers:
        :param labels:
        :return:
        """
        assigned_labels = []
        centers = np.loadtxt('media/centers.txt', dtype=float)
        for i in range(len(features)):
            distances = []
            for j in range(len(centers)):
                d = centers[j, :] - features[i, :]
                distances.append(np.sqrt(np.dot(d, d)))
            assigned_labels.append(np.argmin(distances)+1)
        return assigned_labels

    def get_similar_images(self, query_hist, feature_type='SIFT'):

        if feature_type == 'color':
            histograms = open('media/color_histogram.txt')
            img_hists = np.genfromtxt(histograms, dtype=str)
            num_images, b = img_hists.shape
            distance_threshold = 0.1
            matching_images = []
            query_hist_normalized = query_hist/np.sum(query_hist)
            distances = []
            for i in range(num_images):
                candidate_hist = np.array(img_hists[i, 1:], dtype=float)
                normalization = np.sum(candidate_hist)
                if normalization > 0:
                    candidate_hist /= normalization
                out = np.linalg.norm(candidate_hist-query_hist_normalized)

                if out < distance_threshold:
                    if out != 0.0:
                        distances.append(out)
                        matching_images.append(str(img_hists[i, 0]))

            sorted_images= []
            distances.sort()
            for i in range(len(distances)):
                sorted_images.append(matching_images[i])

            return sorted_images

        elif feature_type == 'GIST':
            print type(query_hist)
            image_names = open('media/image_names.txt')
            names = np.genfromtxt(image_names, dtype=str)
            histograms = open('media/gist.txt')
            img_hists = np.genfromtxt(histograms, dtype=str)
            num_images = len(img_hists)
            distance_threshold = 0.70
            matching_images = []
            distances = []
            for i in range(num_images):
                candidate_hist = np.array(img_hists[i].split(','), dtype=float)
                out = np.linalg.norm(candidate_hist-query_hist)
                print out
                if out < distance_threshold:
                    if out != 0.0:
                        # print out
                        distances.append(out)
                        matching_images.append(names[i])

            sorted_images = []
            distances.sort()
            for i in range(len(distances)):
                sorted_images.append(matching_images[i])

            return sorted_images

        else:

            query_hist = np.array(query_hist, dtype=float)

            histograms = open('media/image_histogram.txt')
            img_hists = np.genfromtxt(histograms, dtype=str)

            num_images, b = img_hists.shape
            matching_coefficient = 0.70
            matching_images = []
            query_hist_normalized = query_hist/np.linalg.norm(query_hist)
            similarity = []
            for i in range(num_images):
                candidate_hist = np.array(img_hists[i, 1:], dtype=float)
                normalization = np.linalg.norm(candidate_hist)
                if normalization > 0:
                    candidate_hist /= normalization
                out = np.dot(query_hist_normalized, candidate_hist)
                if out > matching_coefficient:
                    if out != 1.0:
                        similarity.append(out)
                        matching_images.append(str(img_hists[i, 0]))


            sorted_images= []
            similarity.sort(reverse=True)
            for i in range(len(similarity)):
                sorted_images.append(matching_images[i])

            return sorted_images

