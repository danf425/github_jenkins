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
                    sh 'ssh ubuntu@3.239.17.31 sudo docker ps'
                }

            }
        }
    }
}