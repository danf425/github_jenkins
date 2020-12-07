pipeline {
    agent any

    stages {
        stage ('hello world') {
            steps {
                echo "hello world"
            }
        }
        stage ('SSH into cluster') {
            steps{
                sshagent(credentials : ['danf-ubuntu-k8s']) {
                    sh """ ssh -o StrictHostKeyChecking=no  ubuntu@3.239.17.31 << EOF
                    uptime
                    [ ! -d "/home/ubuntu/github_jenkins" ] && echo "GitHub repo doesn't exists. Cloning..." && git clone https://github.com/danf425/github_jenkins.git
                    cd github_jenkins
                    git pull 
                    kubectl apply -f app.yaml
                    ls
                    """
                }

            }
        }
    }
}