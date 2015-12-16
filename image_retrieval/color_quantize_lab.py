from skimage import io, color
import os

path = '/home/sneha/Documents/Sem1 2015 Fall/Context Slices/Dataset1001/'

for f in os.listdir(path):
    rgb = io.imread(path+f)
    lab = color.rgb2lab(rgb)



#  color quantize in lab space now
