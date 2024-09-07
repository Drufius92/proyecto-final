pipeline {
    agent any
    stages {
        stage('Build and test') {
            agent {
                docker {
                    image 'node:20.11.1-alpine3.19'
                    reuseNode true
                }
            }
            stages {
                stage('instalar dependencias') {
                    steps {
                        sh 'npm install'
                    }
                }
                stage('ejecutar test') {
                    steps {
                        sh 'npm run test'
                    }
                }
                stage('build') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                sh 'docker run -d --rm -p 3001:3001 backend-base-devops:latest'
            }
        }
    }
}
