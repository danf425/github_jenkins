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
                    pwd
                    touch hi
                    EOF"""
                }

            }
        }
    }
}