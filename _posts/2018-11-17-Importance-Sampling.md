---
layout: post
title: Importance sampling
---
This post is about importance sampling. Although it seems to be a sampling method as its name suggests, it is actually a method for estimating the expectation $\mathbb{E}$ of some certain function $f(z)$ w.r.t a probability distribution $p(z)$.

$$\mathbb{E}(f) = \int p(z) f(z) dz$$

One simple strategy is to take discretised $z$ values in $z$-space uniformly and the expectation above is approximated by

$$ \mathbb{E}(f) \approx \sum_{l=1}^{L} p(z^{(l)}) f(z^{(l)}) $$

However, it is inefficient because small value of $p(z^{(l)}) f(z^{(l)}) $ attributes few for the expectation $\mathbb{E}(f)$. Only a small region of $z$ makes contribution to the sum. As the dimensionality of $z$ grows, the situation will get worse.

As we do in rejection-sampling, in importance sampling we also have propose distribution $q(z)$, which is easy to take samples from it. The expectation $\mathbb{E}(f)$ is reformulated.

$$\begin{align}
\mathbb{E}(f) &= \int f(z) p(z) dz \nonumber \\
&= \int f(z) \frac{p(z)}{q(z)} q(z) dz \\
& \approx  \frac{1}{L}\sum_{l = 1}^{L} \frac{p(z^{(l)})}{q(z^{(l)})} f(z^{(l)})
\end{align}$$

In this approximation, the samples $z$ for calculating $\mathbb{E}(f)$ are from propose distribution $q(z)$. Under the assumption that we can easily evaulate $\tilde{p}(z) = Z_p p(z)$ and $\tilde{q}(z) = Z_q q(z)$, we reformulate the equation $\mathbb{E}(f)$ again.

$$
\begin{align}
\frac{1}{L}\sum_{l = 1}^{L} \frac{p(z^{(l)})}{q(z^{(l)})} f(z^{(l)}) &= \sum_{l = 1}^{L} \frac{Z_p * \tilde{p}(z^{(l)})}{Z_q * \tilde{q}(z^{(l)})} f(z^{(l)}) \nonumber \\
&= \frac{Z_q}{Z_p} \sum_{l = 1}^{L} \tilde{r_l}f(z^{(l)}) \\
&= \frac{\sum_{l = 1}^{L} \tilde{r_l}f(z^{(l)})\\}{Z_p/Z_q} \\
&= 
\end{align}
$$
where $\tilde{r_l} = \frac{\tilde{p}(z^{(l)})}{\tilde{q}(z^{(l)})}$.

