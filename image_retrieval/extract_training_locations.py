import numpy as np


train_data = open('num_features.txt')
data = np.genfromtxt(train_data, dtype=str)

locations = []
print data.shape[0]
for i in range(data.shape[0]):
    print i
    locdata = []
    with open('mediaeval2015_placing_mobility_train') as f:
        for line in f:
             info = line.split()
             if str(data[i, 0]) == info[0]:
                 locdata.append(data[i, 0])
                 locdata.append(info[-2])
                 locdata.append(info[-1])
                 locations.append(locdata)
                 locarry = np.asarray(locations, dtype=str)
                 np.savetxt('locations.txt', locarry, '%s')
                 print locdata


