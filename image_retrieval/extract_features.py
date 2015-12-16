import cv2
import os
import numpy as np
from random import sample
path = '/home/sneha/Documents/git/dataset2131/'


s = cv2.SURF(300, extended=True)

# sample N = 100 features from each image
N = 80

for f in os.listdir(path):
    print f
    img = cv2.imread(path+f)
    # print (path+f)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    kp = s.detect(img)
    kp, desc = s.compute(img, kp)
    sample_size = min(N, desc.shape[0])
    sample_indexes = sample(xrange(desc.shape[0]), sample_size)
    desc = np.matrix(desc)
    with open('num_features.txt', 'a') as fp:
        fp.write("%s \t %s\n" % (f, len(sample_indexes)))
    fp.close()
    for i in range(len(sample_indexes)):
        with open('features.txt', 'a') as fo:
            fo.write("%s " % f)
            np.savetxt(fo, desc[sample_indexes[i], :])
        fo.close()
