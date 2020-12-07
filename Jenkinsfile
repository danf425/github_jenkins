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
                    sh """ ssh -o StrictHostKeyChecking=no  ubuntu@3.239.17.31 << EOF
                    uptime
                    [ ! -d "/home/ubuntu/github_jenkins" ] && echo "GitHub repo doesn't exists. Cloning..." && git clone https://github.com/danf425/github_jenkins.git
                    cd github_jenkins
                    git pull 
                    [ ! $(sudo docker images -q danf/logdna-kubecon-demo) ] && echo "Docker image does not exist. Building..." && sudo docker build . -t danf/logdna-kubecon-demo
                    kubectl apply -f app.yaml
                    ls
                    """
                }

            }
        }
    }
}