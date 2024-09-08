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
        stage('QA') {
            stages {
                stage('SonarQube analisis') {
                    agent {
                        docker {
                            image 'sonarsource/sonar-scanner-cli'
                            args '--network="devops-infra_default"'
                            reuseNode true
                        }
                    }
                    steps {
                        withSonarQubeEnv('sonarqube') {
                            sh 'sonar-scanner -Dsonar.host.url=http://172.18.0.5:9000 -X'
                        }
                    }
                }
                
            }
        }
        stage('delivery') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh 'docker build -t backend-base-devops:latest .'
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:latest"
                        sh "docker tag backend-base-devops:latest localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                        sh "docker push localhost:8082/backend-base-devops:latest"
                        sh "docker push localhost:8082/backend-base-devops:${env.BRANCH_NAME}-${env.BUILD_NUMBER}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    docker.withRegistry('http://localhost:8082', 'nexus-key') {
                        sh "docker compose pull"
                        sh "docker compose up --force-recreate --build -d"
                    }
                }
            }
        }
    }
}
