---
layout: post
title: Classical Multidimensional Scaling
card-image: /assets/images/rejection_sampling/overview.png
abstract: MDS example
category: machine learning
---

This post is about an dimension reduction method I used in my master thesis.

## Introduction
Before we start to talk about classical Multidimensional Scaling(MDS). Let's first consider one simple problem from middle school math textbook, 
given two cities coordinates (coordinates of Berlin and Hamburg for example) and how to find the squared distance between them.

It's quite simple,right? Assume the coordinate of Berlin is <img src="http://latex.codecogs.com/svg.latex?(x_{11},x_{12})" border="0"/> 
and the coordinate of Hamburg is  <img src="http://latex.codecogs.com/svg.latex?(x_{21},x_{22})" border="0"/>.
And the squared distance is denoted by  <img src="http://latex.codecogs.com/svg.latex?d^2" border="0"/>. Then for Euclidean distance we have

<img src="http://latex.codecogs.com/svg.latex?d^2=(x_{11}-x_{21})^2+(x_{12}-x_{22})^2" border="0"/>

Now let's go further into m-dim case, how about the squared distance between point <img src="http://latex.codecogs.com/svg.latex?i" border="0"/> and point <img src="http://latex.codecogs.com/svg.latex?j" border="0"/> ?
And the formula now becomes

![equation](https://latex.codecogs.com/svg.latex?d%5E2_%7Bij%7D%20%3D%20%5Csum_%7Bk%20%3D%201%7D%5E%7Bm%7D%28x_%7Bik%7D%20-%20x_%7Bjk%7D%29%5E2)

If we have ![equation](https://latex.codecogs.com/svg.latex?n) points, then we need a distance matrix ![equation](https://latex.codecogs.com/svg.latex?D^2\(X\)) to describe the squared ditances between each of the two points.

![equation](https://latex.codecogs.com/svg.latex?D%5E2%28X%29%20%3D%20%5Cbegin%7Bbmatrix%7D%200%20%26%20d%5E2_%7B12%7D%20%26%20d%5E2_%7B13%7D%20%26%20...%20%26%20d%5E2_%7B1n%7D%5C%5C%20d%5E2_%7B21%7D%20%26%200%20%26%20d%5E2_%7B23%7D%20%26%20...%20%26%20d%5E2_%7B2n%7D%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%5C%5C%20d%5E2_%7Bn1%7D%20%26%20d%5E2_%7Bn2%7D%20%26%20d%5E2_%7Bn3%7D%20%26%20...%20%26%200%5C%5C%20%5Cend%7Bbmatrix%7D)

For now, nothing special, I just started from a two-point distance case to a more general distance case using distance matrix.
But the basic idea is the same, which is to calculate distance or find distance matrix given coordinates.

Now consider reverse situation: We know the distance matrix, is it possible to find the coordinate of each point? If yes, then how?

Classical MDS can address this problem. 

## Definition
According to wiki, MDS is a means of visualizing the level of similarity of individual cases of a dataset.
An MDS algorithm aims to place each object in N-dim space such that the between-object distances are preserved as well as possible.

The definition from Florian Wickelmaier's paper [1] is similar. The data for MDS is now called proximities,
which indicate the overall similarity or dissimilarity of the objects. An MDS program looks for a spatial configuration of the objects, 
so that the distance between the objects match their proximities as colsely as possible.

In our city-distance example, the proximity is the distance matrix and classical MDS will give us the spatial configuration of the cities,
which is the coordinate of each city. 

The classicial MDS is also known as Principal Coordinates Analysis(PCoA).

# Classical MDS

**Given**

![equation](https://latex.codecogs.com/svg.latex?D%5E2%28X%29%20%3D%20%5Cbegin%7Bbmatrix%7D%200%20%26%20d%5E2_%7B12%7D%20%26%20d%5E2_%7B13%7D%20%26%20...%20%26%20d%5E2_%7B1n%7D%5C%5C%20d%5E2_%7B21%7D%20%26%200%20%26%20d%5E2_%7B23%7D%20%26%20...%20%26%20d%5E2_%7B2n%7D%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%5C%5C%20d%5E2_%7Bn1%7D%20%26%20d%5E2_%7Bn2%7D%20%26%20d%5E2_%7Bn3%7D%20%26%20...%20%26%200%5C%5C%20%5Cend%7Bbmatrix%7D)

**Goal**

![equation](http://latex.codecogs.com/svg.latex?X%20%3D%20%5Cbegin%7Bbmatrix%7D%20x_%7B11%7D%20%26%20x_%7B12%7D%20%26%20x_%7B13%7D%20%26%20...%20%26%20x_%7B1m%7D%5C%5C%20x_%7B21%7D%20%26%20x_%7B22%7D%20%26%20x_%7B23%7D%20%26%20...%20%26%20x_%7B2m%7D%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20x_%7Bn1%7D%20%26%20x_%7Bn2%7D%20%26%20x_%7Bn3%7D%20%26%20...%20%26%20x_%7Bnm%7D%20%5Cend%7Bbmatrix%7D)

**Assumption**

Coordinate matrix![equation](https://latex.codecogs.com/svg.latex?X) has column means equal to 0, since distances don't change under translations.

**Solution**

Firstly, we define two n-element column vectors ![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Be%7D) and ![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Ba%7D)

![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Be%7D%20%3D%20%5Cbegin%7Bbmatrix%7D%201%20%5C%5C%201%20%5C%5C%201%20%5C%5C%20...%20%5C%5C%201%20%5C%5C%20%5Cend%7Bbmatrix%7D)
![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Ba%7D%20%3D%20%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x_%7B1k%7D%5E2%20%5C%5C%20x_%7B2k%7D%5E2%20%5C%5C%20x_%7B3k%7D%5E2%20%5C%5C%20...%20%5C%5C%20x_%7Bnk%7D%5E2%20%5C%5C%20%5Cend%7Bbmatrix%7D)

Then we have

![equation](https://latex.codecogs.com/svg.latex?$$%5Cvec%7Ba%7D*%5Cvec%7Be%7D%5ET%20%3D%20%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x_%7B1k%7D%5E2%20%26%20x_%7B1k%7D%5E2%20%26%20...%20%26%20x_%7B1k%7D%5E2%20%5C%5C%20%5C%5C%20x_%7B2k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7B2k%7D%5E2%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20%5C%5C%20x_%7Bnk%7D%5E2%20%26%20x_%7Bnk%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%5Cvec%7Be%7D*%5Cvec%7Ba%7D%5ET%20%3D%20%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5C%5C%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20%5C%5C%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5Cend%7Bbmatrix%7D$$)

The distance matrix can be decomposed into 3 parts.

![equation](https://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20D%5E2%28X%29%20%26%3D%20%5Cvec%7Ba%7D*%5Cvec%7Be%7D%5ET%20&plus;%20%5Cvec%7Be%7D*%5Cvec%7Ba%7D%5ET%20-%202XX%5ET%5C%5C%20%26%3D%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x_%7B1k%7D%5E2%20%26%20x_%7B1k%7D%5E2%20%26%20...%20%26%20x_%7B1k%7D%5E2%20%5C%5C%20%5C%5C%20x_%7B2k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7B2k%7D%5E2%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20%5C%5C%20x_%7Bnk%7D%5E2%20%26%20x_%7Bnk%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5Cend%7Bbmatrix%7D%20&plus;%20%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5C%5C%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%5C%5C%20%5C%5C%20x_%7B1k%7D%5E2%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7Bnk%7D%5E2%20%5C%5C%20%5Cend%7Bbmatrix%7D%20-2%20%5Csum_%7Bk%3D1%7D%5Em%20%5Cbegin%7Bbmatrix%7D%20x%5E2_%7B1k%7D%20%26%20x_%7B1k%7D%20x_%7B2k%7D%20%26%20...%20%26%20x_%7B1k%7D%20x_%7Bnk%7D%20%5C%5C%20%5C%5C%20x_%7B2k%7Dx_%7B1k%7D%20%26%20x_%7B2k%7D%5E2%20%26%20...%20%26%20x_%7B2k%7D%20x_%7Bnk%7D%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%5C%5C%20%5C%5C%20x_%7Bnk%7D%20x_%7B1k%7D%20%26%20x_%7Bnk%7D%20x_%7B2k%7D%20%26%20...%20%26%20x%5E2_%7Bnk%7D%20%5C%5C%20%5Cend%7Bbmatrix%7D%20%5Cend%7Balign*%7D)

Now we need to introduce one special matrix called centering matrix ![equation](https://latex.codecogs.com/svg.latex?J)

![equation](https://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20J%20%26%3D%20I%20-%20%5Cfrac%7B1%7D%7Bn%7D%5Cvec%7Be%7D*%5Cvec%7Be%7D%5ET%5C%5C%20%26%3D%20%5Cbegin%7Bbmatrix%7D%20%5Cfrac%7Bn-1%7D%7Bn%7D%20%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20...%20%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%5C%5C%20%5C%5C%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20%5Cfrac%7Bn-1%7D%7Bn%7D%20%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20..%20.%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%5C%5C%20%5C%5C%20...%20%26%20...%20%26%20...%20%26%20...%20%26%20...%5C%5C%20%5C%5C%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20-%5Cfrac%7B1%7D%7Bn%7D%20%26%20...%20%26-%5Cfrac%7B1%7D%7Bn%7D%20%26%20%5Cfrac%7Bn-1%7D%7Bn%7D%5C%5C%20%5Cend%7Bbmatrix%7D%20%5Cend%7Balign*%7D)

![equation](https://latex.codecogs.com/svg.latex?n) is the number of elements in vector ![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Be%7D)

The property of centering matrix we are going to use here is that by multiplication ![equation](https://latex.codecogs.com/svg.latex?JX), the mean from each of the columns in ![equation](https://latex.codecogs.com/svg.latex?X) will be removed and by multiplication ![equation](https://latex.codecogs.com/svg.latex?XJ), the mean from each of the rows in ![equation](https://latex.codecogs.com/svg.latex?X) will be removed.

The result of ![equation](https://latex.codecogs.com/svg.latex?-\frac{1}{2}JDJ) is

![equation](http://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20-%5Cfrac%7B1%7D%7B2%7DJDJ%20%26%3D%20-%5Cfrac%7B1%7D%7B2%7DJ%28%5Cvec%7Ba%7D*%5Cvec%7Be%7D%5ET%20&plus;%20%5Cvec%7Be%7D*%5Cvec%7Ba%7D%5ET%20-%202XX%5ET%29J%20%5C%5C%20%26%3D%20-%5Cfrac%7B1%7D%7B2%7DJ%5Cvec%7Ba%7D*%5Cvec%7Be%7D%5ETJ%20-%20-%5Cfrac%7B1%7D%7B2%7DJ%20%5Cvec%7Be%7D*%5Cvec%7Ba%7D%5ETJ%20&plus;J%20XX%5ETJ%20%5C%5C%20%26%3D%20XX%5ET%5C%5C%20%5Cend%7Balign*%7D)

Because 

1. The result of ![equation](https://latex.codecogs.com/svg.latex?%5Cvec%7Be%7D%5ETJ) or ![equation](https://latex.codecogs.com/svg.latex?J%5Cvec%7Be%7D) is a vector. And all elements in this vector is ![equation](https://latex.codecogs.com/svg.latex?0). 
2. The mean from each of the columns in ![equation](https://latex.codecogs.com/svg.latex?X) is 0, ![equation](https://latex.codecogs.com/svg.latex?JX%20%3D%20X) and ![equation](https://latex.codecogs.com/svg.latex?X%5ETJ%20%3D%20X%5ET). 

Apparently, ![equation](https://latex.codecogs.com/svg.latex?XX%5ET) is a symmetric matrix. And by using eigendecompostion, we will obtain

![equation](https://latex.codecogs.com/svg.latex?%5Cbegin%7Balign*%7D%20XX%5ET%20%26%3D%20Q%20%5CLambda%20Q%5ET%5C%5C%20%26%3D%20%28Q%5CLambda%5E%7B%5Cfrac%7B1%7D%7B2%7D%7D%29%28Q%5CLambda%5E%7B%5Cfrac%7B1%7D%7B2%7D%7D%29%5ET%20%5Cend%7Balign*%7D)

![equation](https://latex.codecogs.com/svg.latex?Q) is
the a matrix whose columns are eigenvectors of matrix ![equation](https://latex.codecogs.com/svg.latex?XX^T).

![equation](https://latex.codecogs.com/svg.latex?\Lambda) is a diagonal matrix whose entries are the eigenvalues of ![equation](https://latex.codecogs.com/svg.latex?XX^T).

![equation](https://latex.codecogs.com/svg.latex?\Lambda^{\frac{1}{2}}) is the result of element-wise square root of ![equation](https://latex.codecogs.com/svg.latex?\Lambda)

Finally, the problem of finding the coordinate matrix now becomes finding the eigenvalues and eigenvectors of ![equation](https://latex.codecogs.com/svg.latex?JDJ)

Depending on the desired output dimension ![equation](https://latex.codecogs.com/svg.latex?m), usually ![equation](https://latex.codecogs.com/svg.latex?m=2), we take ![equation](https://latex.codecogs.com/svg.latex?m) largest eigenvalues and corresponding eigenvectors. We can obtain ![equation](https://latex.codecogs.com/svg.latex?X).

![equation](https://latex.codecogs.com/svg.latex?X=Q_m\Lambda_m^{\frac{1}{2}})

Negative eigenvalues are simply ignored as error in classical MDS.

# Summary
Classical MDS gives us an analytical solution for finding coordinates given distance matrix. The limit of classical MDS is also obvious. Since it assumes Euclidean distance, it is not applicable for direct dissimilarity ratings [3].

For the choice of output dimension ![equation](https://latex.codecogs.com/svg.latex?m), Sibson (1979) suggests that the sum of the eigenvalues in ![equation](https://latex.codecogs.com/svg.latex?\Lambda_m) should approximate the sum of all eigenvalues in ![equation](https://latex.codecogs.com/svg.latex?\Lambda), so that small negative eigenvalues cancel out small positive eigenvalues [2].

# References
[1] Florian Wickelmaier, *An Introduction to MDS*, Aalborg University, 2003

[2] Ingwer Borg, Patrick Groenen, *Modern Multidimensional Scaling Theory and Applications*, Springer

[3] https://en.wikipedia.org/wiki/Multidimensional_scaling
