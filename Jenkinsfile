#!/usr/bin/env groovy

pipeline {
    agent any

    // environment {
    //     test = sh(script: "kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'", returnStdout: true).trim()
    // }


    stages {
        stage ('hello world') {
            steps {
                echo "hello world"
            }
        }
        stage ('Deploy new YAML into production') {
            steps{
                sshagent(credentials : ['danf-ubuntu-k8s']) {
                    sh """#!/bin/bash
                    ssh -o StrictHostKeyChecking=no  ubuntu@18.206.87.22 << EOF
                    [ ! -d "/home/ubuntu/tree_troubleshooting_k8s_demo" ] && echo "GitHub repo doesn't exists. Cloning..." && git clone https://github.com/danf425/tree_troubleshooting_k8s_demo.git
                    cd tree_troubleshooting_k8s_demo
                    git pull 
                    # [ ! \$(docker images -q dmontanez/logdna-kubecon-demo) ] && echo "Docker image does not exist. Building..." && docker build . -t dmontanez/logdna-kubecon-demo
                    kubectl apply -f app.yaml
                    echo "here are my problems"
                    sleep 1
                    cd ..
                    echo "#!/bin/bash" > svc_url.sh
                    echo '\n' > svc_url.sh
                    kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}' >> svc_url.sh
                    echo ":8080" >> svc_url.sh
                    cat svc_url.txt
                    echo "url stored in file"
                    # echo "\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080"
                    # curl "\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080"
                    # svc_url="\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
                    # svc_url+=":8080"
                    # echo \$svc_url
                    # sleep 5
                    # curl \$svc_url       
                    echo "test... 1,2,3"
                    #`sudo docker images`
                    #sudo docker images   
                    #curl `cat svc_url.txt`          
                    """
                }

            }
        }

    }
}