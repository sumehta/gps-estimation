__author__ = 'sneha'

from sklearn.cluster import KMeans
from sklearn.cluster import MiniBatchKMeans
import numpy

features = open('features.txt')
# Number of clusters
K = 900

new_data = numpy.loadtxt(features, dtype=(numpy.string_, numpy.float_))
data = numpy.delete(new_data, 0, 1)

print data.shape

# kms = KMeans(n_clusters=200)
# kms.fit(data)
# centers = kms.cluster_centers_
# labels = kms.labels_
# numpy.savetxt('test.txt', centers)

mbkms = MiniBatchKMeans(n_clusters=K)
mbkms.fit_predict(data)
centres = mbkms.cluster_centers_
labels = mbkms.labels_
numpy.savetxt('centers.txt', centres)
numpy.savetxt('labels.txt', labels)

