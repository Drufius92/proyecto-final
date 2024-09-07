pipeline {
    agent any
    stages {
        stage('dependencias'){
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19'
                }
            }
            stages{
                stage('dependencias'){
                    steps {
                        sh 'npm install'
                    }
                }
            }
            stages{
                stage('test'){
                    steps {
                        sh 'npm run test'
                    }
                }
            }
        }
    }
}