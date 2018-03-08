# What is MDS
## Introduction
Before we start to talk about Multidimensional Scaling(MDS). Let's first consider one simple problem from middle school math textbook, 
given two cities coordinates (coordinates of Berlin and Hamburg for example) and find the squared distance between them.

It's quite simple,right? Assume the coordinate of Berlin is <img src="http://latex.codecogs.com/svg.latex?(x_{11},x_{12})" border="0"/> 
and the coordinate of Hamburg is  <img src="http://latex.codecogs.com/svg.latex?(x_{21},x_{22})" border="0"/>.
And the squared distance is denoted by  <img src="http://latex.codecogs.com/svg.latex?d^2" border="0"/>. Then for Euclidean distance we have

<img src="http://latex.codecogs.com/svg.latex?d^2=(x_{11}-x_{21})^2+(x_{12}-x_{22})^2" border="0"/>

Now let's go further into m-dim case, the squared distance between point <img src="http://latex.codecogs.com/svg.latex?i" border="0"/> and point <img src="http://latex.codecogs.com/svg.latex?j" border="0"/>.
And the formula now becomes

<img src="http://latex.codecogs.com/svg.latex?d_{ij}^2=\sum_{a=1}^{m}(x_{ia}-x_{ja})^2" border="0"/>

And how about <img src="http://latex.codecogs.com/svg.latex?n" border="0"/> points in m-dim? We want to find the distance matrix with element <img src="http://latex.codecogs.com/svg.latex?x_{i,j}" border="0"/>
representing the distance from point <img src="http://latex.codecogs.com/svg.latex?i" border="0"/> to 
point <img src="http://latex.codecogs.com/svg.latex?j" border="0"/>, 
we have a <img src="http://latex.codecogs.com/svg.latex?n*m" border="0"/> data point matrix <img src="http://latex.codecogs.com/svg.latex?X" border="0"/>

![equation](http://latex.codecogs.com/svg.latex?X%20%3D%20%5Cbegin%7Bbmatrix%7D%20x_%7B11%7D%20%26%20x_%7B12%7D%20%26%20x_%7B13%7D%20%26%20...%20%26%20x_%7B1m%7D%5C%5C%20x_%7B21%7D%20%26%20x_%7B22%7D%20%26%20x_%7B23%7D%20%26%20...%20%26%20x_%7B2m%7D%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20x_%7Bn1%7D%20%26%20x_%7Bn2%7D%20%26%20x_%7Bn3%7D%20%26%20...%20%26%20x_%7Bnm%7D%20%5Cend%7Bbmatrix%7D)

![equation](http://latex.codecogs.com/svg.latex?%24%24%20%5Cbegin%7Balign*%7D%20D%5E2%28X%29%20%26%3D%20%5Cbegin%7Bbmatrix%7D%200%20%26%20d%5E2_%7B12%7D%20%26%20d%5E2_%7B13%7D%20%26%20...%20%26%20d%5E2_%7B1n%7D%5C%5C%20d%5E2_%7B21%7D%20%26%200%20%26%20d%5E2_%7B32%7D%20%26%20...%20%26%20d%5E2_%7B2n%7D%5C%5C%20d%5E2_%7B31%7D%20%26%20d%5E2_%7B32%7D%20%26%200%20%26%20...%20%26%20d%5E2_%7B3n%7D%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20d%5E2_%7Bn1%7D%20%26%20d%5E2_%7Bn2%7D%20%26%20...%20%26%20...%20%26%200%20%5Cend%7Bbmatrix%7D%5C%5C%20%26%3D%20%5Csum_%7Ba%3D1%7D%5E%7Bm%7D%5Cbegin%7Bbmatrix%7D%20x_%7B1a%7D%5E2%20%26%20x_%7B1a%7D%5E2%20%26%20x_%7B1a%7D%5E2%20%26%20...%20%26%20x_%7B1a%7D%5E2%5C%5C%20x_%7B2a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20...%20%26%20x_%7B2a%7D%5E2%5C%5C%20x_%7B3a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20...%20%26%20x_%7B3a%7D%5E2%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20x_%7Bna%7D%5E2%20%26%20x_%7Bna%7D%5E2%20%26%20x_%7Bna%7D%5E2%20%26%20x_%7Bna%7D%5E2%20%26%20x_%7Bna%7D%5E2%20%5Cend%7Bbmatrix%7D%20&plus;%20%5Csum_%7Ba%3D1%7D%5E%7Bm%7D%5Cbegin%7Bbmatrix%7D%20x_%7B1a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20...%20%26%20x_%7Bna%7D%5E2%5C%5C%20x_%7B1a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20...%20%26%20x_%7Bna%7D%5E2%5C%5C%20x_%7B1a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20...%20%26%20x_%7Bna%7D%5E2%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20x_%7B1a%7D%5E2%20%26%20x_%7B2a%7D%5E2%20%26%20x_%7B3a%7D%5E2%20%26%20...%20%26%20x_%7Bna%7D%5E2%20%5Cend%7Bbmatrix%7D%20-%202XX%5ET%20%5Cend%7Balign*%7D%20%24%24)

For now, nothing special, I just started from a two-point distance case to a more general distance case using distance matrix.
But the basic idea is the same, which is to calculate distance or find distance matrix given coordinates.

Now consider inverse situation: We know the distance matrix, is it possible to find the coordinate of each point? If yes, then how?

The MDS can give us the answer. More specifically, in our city distance example, classical MDS can address the problem. 
More details about classical MDS will be in the second section.

## Definition
According to wiki, MDS is a means of visualizing the level of similarity of individual cases of a dataset.
An MDS algorithm aims to place each object in N-dim space such that the between-object distances are preserved as well as possible.

The definition from Florian Wickelmaier's paper(see reference 2) is similar. The data for MDS is now called proximities,
which indicate the overall similarity or dissimilarity of the objects. An MDS program looks for a spatial configuration of the objects, 
so that the distance between the objects mathc their proximities as colsely as possible.

In our city-distance example, the proximity is the distance matrix and MDS will give us the spatial configuration of the cities,
which is the coordinate of each city.

# Different Types of MDS

# References
<img src="http://latex.codecogs.com/svg.latex?" border="0"/>
