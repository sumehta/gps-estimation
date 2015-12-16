__author__ = 'sneha'
import numpy as np

num_images = 978
matching_coefficient = 0.95
matching_images = []

histograms = open('image_histogram.txt')
img_hists = np.genfromtxt(histograms, dtype=str)


# create a dictionary to store imageid, histogram pairs
# img_hists_dict = {}
# for i in range(num_images):
#     img_hists_dict[str(img_hists[i,0])] = np.array(img_hists[i,1:], dtype=float)
#
#


query_image = img_hists[34, 0]
print "query_image = %s" % query_image

query_hist = np.array(img_hists[34,1:], dtype=float)
print query_hist

query_hist_normalized = query_hist/np.linalg.norm(query_hist)


for i in range(num_images):
    candidate_hist = np.array(img_hists[i, 1:], dtype=float)
    normalization = np.linalg.norm(candidate_hist)
    if normalization > 0:
        candidate_hist = candidate_hist/normalization
    out = np.dot(query_hist_normalized, candidate_hist)
    if out > matching_coefficient:
        print out
        matching_images.append(str(img_hists[i, 0]))

print matching_images

