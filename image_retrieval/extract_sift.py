__author__ = 'sneha'

# from a single image, extract SIFT features from it
import cv2
import numpy as np
import math


# Uses the grid adapted feature detection to limit the Number of detected keypoints
def getSIFT( img, show=1, maxfeatures = 500, xgrid=1, ygrid=1):
    img2 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY )
    siftDet =  cv2.FeatureDetector_create("SIFT")
    siftDetGrid = cv2.GridAdaptedFeatureDetector(siftDet, maxfeatures,xgrid,ygrid)
    siftDesc = cv2.DescriptorExtractor_create("SIFT")
    fs = siftDetGrid.detect(img2)

    (keypoints,descriptors) = siftDesc.compute(img2,fs)

    if show==1:
        imgwSIFT = img.copy()
        d_blue = cv2.cv.B(25, 15, 100)
        l_blue = cv2.cv.RGB(200, 200, 250)
        for f in fs:
            cv2.circle(imgwSIFT, (int(f.pt[0]), int(f.pt[1])), int(f.size/2), l_blue, 2, cv2.CV_AA)
            cv2.circle(imgwSIFT, (int(f.pt[0]), int(f.pt[1])), int(f.size/2), d_blue, 1, cv2.CV_AA)
            ori = math.radians(f.angle)
            tx = math.cos(ori) * 0 - math.sin(ori) * (f.size/2)
            ty = math.sin(ori) * 0 + math.cos(ori) * (f.size/2)
            tx += f.pt[0]
            ty += f.pt[1]
            cv2.line(imgwSIFT, (int(f.pt[0]), int(f.pt[1])), (int(tx), int(ty)), l_blue, 2, cv2.CV_AA)
            cv2.line(imgwSIFT, (int(f.pt[0]), int(f.pt[1])), (int(tx), int(ty)), d_blue, 1, cv2.CV_AA)

        cv2.imshow(imgwSIFT[:,:,::-1])

    return(keypoints, descriptors)


def extract_sift(imName):
    outName = imName.split('.')[0]
    out = outName+'.SIFT'
    featFile = open(out, 'w')
    im = cv2.imread(imName)
    kp, desc = getSIFT( im, show=0, maxfeatures=500 )  # set to whatever you want to have as max SIFt points
    # These silly joins convert the numpy 2d array into a string with space delimiting.
    # Name, imgrows, imgcols, number of keypoints, list of ( keypoint location (x,y), keypoint size, keypoint strength(float), keypoint angle,keypoint octave, descriptor (128 floats per keypoint) )
    outStr= imName+ ','  + str(np.size(im,0)) + ',' + str(np.size(im,1))+ ',' + str(np.size(kp))
    for i in range(np.size(kp)):
        ktmp=kp[i]
        dtmp = desc[i]
        outStr+=',' + str(int(round(ktmp.pt[0]))) + ',' + str(int(round(ktmp.pt[1]))) + ',' + str(ktmp.size) + ',' + str(ktmp.response) +  ',' +str(int(ktmp.angle)) +  ',' +str(int(ktmp.octave)) +  ','
        outStr+= ' '.join(map(str,np.ndarray.tolist(dtmp.flatten())))

    outStr+= '\n'
    featFile.write(outStr)
    featFile.close()
    return kp, desc


def file_to_sift(filename):
    kp = []
    desc = []
    with open(filename) as f:
        feat_str = f.read().strip()
        cols = feat_str.split(',')

        imName = cols[0]
        im_size = map(int, (cols[1], cols[2]))
        kp_size = int(cols[3])
        for i in range(kp_size):
            base_idx = 4 + i*7
            kp_desc = map(float, cols[base_idx:base_idx+6])
            x = int(kp_desc[0])
            y = int(kp_desc[1])
            kp_size = kp_desc[2]
            kp_response = kp_desc[3]
            kp_angle = int(kp_desc[4])
            kp_octave = int(kp_desc[5])

            ktmp = cv2.KeyPoint(x = x, y = y, _size = kp_size, _angle = kp_angle, _response = kp_response, _octave = kp_octave)
            kp.append(ktmp)

            dtmp = cols[base_idx+6]
            dtmp = map(float, dtmp.split())

            desc.append(dtmp)

    return kp, np.array(desc, dtype=np.float32)

# import pdb
# pdb.set_trace()
extract_sift('testImg')