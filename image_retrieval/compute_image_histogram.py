__author__ = 'sneha'

import numpy as np

# number of clusters
clusters = 900

features = open('num_features.txt')
labels = open('labels.txt')

# image_id   <number of features>
num_features = np.genfromtxt(features, dtype=str)
print num_features

# class label for each feature
feature_labels = np.genfromtxt(labels, dtype=float)

image_ids = num_features[:, 0]
print(len(image_ids))
# print(np.sum(num_features, 1))

j = 0

for i in range(len(image_ids)):
    feature_count = num_features[i, 1]
    hist = np.zeros([1, clusters], dtype=int)
    for k in range(int(feature_count)):
        print j
        hist[0,int(feature_labels[j])] = hist[0,int(feature_labels[j])] + 1
        j = j+1
    with open("image_histogram.txt", "a") as f:
        f.write("%s " % image_ids[i])
        np.savetxt(f, hist)
        f.write("\n")

