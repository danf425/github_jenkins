#!/usr/bin/env groovy

pipeline {
    agent any
    environment {
        TEST2 = sh(script: "$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080")
    }

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
                    uptime
                    [ ! -d "/home/ubuntu/tree_troubleshooting_k8s_demo" ] && echo "GitHub repo doesn't exists. Cloning..." && git clone https://github.com/danf425/tree_troubleshooting_k8s_demo.git
                    cd tree_troubleshooting_k8s_demo
                    git pull 
                    # [ ! \$(docker images -q dmontanez/logdna-kubecon-demo) ] && echo "Docker image does not exist. Building..." && docker build . -t dmontanez/logdna-kubecon-demo
                    kubectl apply -f app.yaml
                    echo "here are my problems"
                    echo \$testx
                    echo "\$testx"
                    sleep 1
                    kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}' > svc_url.txt
                    echo ":8080" >> svc_url.txt
                    cat svc_url.txt
                    sleep 10
                    #curl ... --data '{ "file_content":["' `cat svc_url.txt` '", ...]}"' ...
                    echo $TEST2
                    echo "test_completed"
                    # echo "\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080"
                    # curl "\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080"
                    # svc_url="\$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}')"
                    # svc_url+=":8080"
                    # echo \$svc_url
                    # sleep 5
                    # curl \$svc_url                    
                    """
                }

            }
        }
        stage ('test new deployment') {
            steps{
                sshagent(credentials : ['danf-ubuntu-k8s']) {
                    sh """#!/bin/bash
                    ssh -o StrictHostKeyChecking=no  ubuntu@18.206.87.22 << EOF
                    uptime
                    cd tree_troubleshooting_k8s_demo
                    git pull 
                    cat svc_url.txt
                    sleep 11
                    #curl ... --data '{ "file_content":["' `cat svc_url.txt` '", ...]}"' ...
                    #echo "test_completed"
                    """
                }

            }
        }
    }
}