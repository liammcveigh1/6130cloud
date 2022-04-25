# 6130cloud

[on mobaxterm]

cd week6/
(to deploy cluster)

--intiate cluster--

'sudo docker-compose up'
(this is used to load up the three nodes on a cluster)

'sudo docker container ls'
(this can be ran to see if the clusters are up and running)

--GET and POST functions can be selected in visual studio code for in the playground--

If any changes are made in the src fileon mobaxterm the code,
'sudo docker-container build'
must be used to rebuild the nodejs image. Then 
'sudo docker-compose up' 
to start the cluster

cd week5/ 
(to test nginx loader balancer)

nginx files have been created and configured so to build and load composition type,
'sudo docker-compose up'
this can then be tested using the service 
'lynx http://127.0.01'

