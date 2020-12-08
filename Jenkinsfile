pipeline {
    agent any

    stages {
        stage ('hello world') {
            steps {
                echo "hello world"
            }
        }
        stage ('Deploy new YAML into production') {
            steps{
                sshagent(credentials : ['danf-ubuntu-k8s']) {
                    sh """ ssh -o StrictHostKeyChecking=no  ubuntu@18.206.87.22 << EOF
                    uptime
                    [ ! -d "/home/ubuntu/tree_troubleshooting_k8s_demo" ] && echo "GitHub repo doesn't exists. Cloning..." && git clone https://github.com/danf425/tree_troubleshooting_k8s_demo.git
                    cd tree_troubleshooting_k8s_demo
                    git pull 
                    # [ ! \$(docker images -q dmontanez/logdna-kubecon-demo) ] && echo "Docker image does not exist. Building..." && docker build . -t dmontanez/logdna-kubecon-demo
                    kubectl apply -f app.yaml
                    ls
                    sleep 3
                    $(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}')
                    sleep 10
                    
                    curl \$(kubectl get svc tree-lb-service -o=jsonpath='{.status.loadBalancer.ingress[0].hostname}'):8080
                    """
                }

            }
        }
    }
}