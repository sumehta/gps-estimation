import os
import cv2
import numpy as np


path = '/home/sneha/Documents/git/dataset2231/'


# sample N = 100 features from each image
N = 100

for f in os.listdir(path):
    print f
    img = cv2.imread(path+f)
    hist1 = cv2.calcHist([img], [0], None, [60], [0, 256])
    hist2 = cv2.calcHist([img], [1], None, [60], [0, 256])
    hist3 = cv2.calcHist([img], [2], None, [60], [0, 256])
    hist = np.concatenate((hist1, hist2, hist3))
    hist = hist.transpose()
    with open("color_histogram.txt", "a") as fp:
        fp.write("%s " % f)
        np.savetxt(fp, hist)
        fp.write("\n")

