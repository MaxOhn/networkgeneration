## networkgeneration

This project is my contribution regarding the summer terms 2018 Softwarepraktikum course at the RWTH Aachen.

Javascript searches for HTML element with id "container" and does everything from there.

[Running site](https://maxohn.github.io/networkgeneration/)

## How to use

Press spacebar or click on either canvas left or right to start generating.

Shift + Click/Spacebar will reset to initial state.

Select Model type for different kind of generations.

Set parameters enables changing specific variables for the current model.

Chart type provides additional charts to view some network properties.

## How it works

[Barabasi-Albert](https://arxiv.org/pdf/cond-mat/9910332.pdf): Each step generates a node with m edges to the network. The probability for the new node to connect to a certain node depends on the nodes degree. The higher the degree, the more likely. [Power-law network]

[Minority](https://arxiv.org/pdf/1702.00150.pdf): Barabasi-Albert extension where each node is assigned one of two groups. The homopfily parameter decides on how those groups connect. [Power-law network]

[Gilbert](https://projecteuclid.org/euclid.aoms/1177706098): Given an amount of nodes and a probability, check for each pair of nodes this probability to generate an edge between them. [Random network]

[Watts Alpha](https://books.google.it/books/princeton?hl=en&q=These%20conditions%20could%20be%20satisfied&vid=ISBN9780691117041&redir_esc=y#v=snippet&q=These%20conditions%20could%20be%20satisfied&f=false): Given a regular network, add edges until a given average node degree is reached. Edges depend on an alpha-factor indicating whether to only connect to close nodes or to random nodes across the network. [Small-world network]

[Watts Beta](http://worrydream.com/refs/Watts-CollectiveDynamicsOfSmallWorldNetworks.pdf): Given a regular network, each edge gets rewired with a given probability to a random other node. [Small-world network]
