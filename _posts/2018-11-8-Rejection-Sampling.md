---
layout: post
title: Rejection sampling
---
# Rejection sampling

This post is related with the seminar Mathematics of machine learning (the link of seminar) that I am taking this winter semester. In the seminar of this semester, the main topics is about sampling techniques. I am interested in this area. And since I am about to graduate and have plenty of free time. I decided to write some posts and also do some programming about what I learned in the seminar. 

## Problem scenario
Let’s go back to the topic rejection sampling. It is a technique to generate observations from a distribution. We assume that there is a probability distribution $p(z)$. We want to sample from it. 

Here is the description of $p(z)$ in [1], *we are easily able to evaluate $p(z)$ for any given value of z, up to some normalizing constant Z, so that*
$$p(z) = \frac{1}{Z_p}\tilde{p}(z)$$

The interesting question is when we are in this situation. A known $\tilde{p}(z)$ is equal to some certain constant $Z_p$ times $p(z)$. To answer this question, we just need to check the Bayes' theorem.
$$p(\theta| x) = \frac{p(x|\theta)p(\theta)}{p(x)}$$
On the right hand side, the denominator is also called evidence. And it is a constant. We usually know the likelihood function $p(x|\theta)$ and the prior distribution $p(\theta)$. We want to know the posterior, which is the left hand side of the equation. This perfectly fits the scenario of rejection sampling!

## Definitions and assumptions
Assuming that we can only sample from some standard distributions $q(x)$, for example Gaussian distribution and uniform distribution. We call it proposal distribution.

We define that the probability distribution that we want to take samples from is $p(z)$, which is a complicated distribution. We have $\tilde{p}(x) = Z_p* p(z)$. 

Then we introduce a constant $k$ that for all $z$, $kq(z) \geq \tilde{p}(z)$. $kq(z)$ is called envelope function or comparision function.

## Algorithm details
The rejection sampling algorithm is:

1. Take a sample $z_0$ from distribution $q(z)$.

2. Calculate the value $kq(z_0)$ and $\tilde{p}(z_0)$

3. Take a sample $u_0$ from uniform distribution $U[0, kq(z_0)]$.

4. If $u_0 > \tilde{p}(z_0)$:
        
    &nbsp; &nbsp; Reject and back to step 1

&nbsp; &nbsp; &nbsp; &nbsp;else:

&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; $u_0$ is a sample from $p(z)$

## Proof
*TBD*
## Experiments of implementation
*TBD*
## References
[1] Bishop

*TBD*