#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        IMAGEM_DOCKER = "dockerhub.camara.gov.br/socit/portal/portal-noticias"
        NOME_SERVICO = 'portal/portal-noticias'
        URL_RANCHER = 'https://rancher.camara.gov.br/v2-beta'
        APROVADORES = 'P_991173,P_7192,P_6992,P_7006,P_7274,P_999259,p_991010,P_991236'
        EMAIL = 'sepop.cenin@camara.leg.br'
        VERSAO_NODE_JS = 'NodeJS8'
        CONFIG_NODE_JS = '211e3b36-ac91-4e95-8e0a-ccc8c6e847c7'
        CANAL_CHATOPS = 'socit'
    }
    stages {
        stage('Git checkout') {
            steps {
                checkout scm
                    script {
                        DEPLOY_EM_PRODUCAO = false
                        VERSAO = sh (script: 'cat package.json | grep version | head -1 | awk -F: \'{ print $2 }\' | sed \'s/[",]//g\' ' , returnStdout: true).trim()
                    }
            }
        }
        stage('Execução dos Testes Unitários e Integração') {
            steps {
                nodejs(configId: env.CONFIG_NODE_JS, nodeJSInstallationName: env.VERSAO_NODE_JS) {
                    sh 'export NODE_ENV=desenvolvimento && npm ci && npm test'
                }
            }
            post {
                always {
                    junit 'test/resultado/junit/junit.xml'
                    step([$class: 'CoberturaPublisher', coberturaReportFile: 'test/resultado/cobertura-coverage.xml'])
                }
            }
        }
        stage('Imagem Docker') {
            when {
                branch 'master'
            }
            steps {
                nodejs(configId: env.CONFIG_NODE_JS, nodeJSInstallationName: env.VERSAO_NODE_JS) {
                    sh 'npm prune --production'
                }
                withDockerRegistry([credentialsId: 'c34117dc-5fa1-46f8-8ebb-f1cf0b2254c4', url: 'https://dockerhub.camara.gov.br/']) {
                    script {
                        imagem = docker.build("${env.IMAGEM_DOCKER}:${VERSAO}", ".")
                        imagem.push()
                    }
                }
            }
        }
        stage('Deploy Ambiente de Testes') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "Deploy environment Test"
                    rancher confirm: true, startFirst: true, credentialId: 'rancher-server', endpoint: "${env.URL_RANCHER}",
                        environmentId: '1a9', environments: '', image: "${env.IMAGEM_DOCKER}:${VERSAO}", ports: '',
                        service: "${env.NOME_SERVICO}", timeout: 100
                }
            }
        }
        stage('Deploy ambiente de Homologacao e atualização de versão no package.json') {
            when {
                branch 'master'
            }
            steps {
                script {
                    echo "Deploy ambiente de Homologacao"
                    rancher confirm: true, startFirst: true, credentialId: 'rancher-server', endpoint: "${env.URL_RANCHER}",
                        environmentId: '1a408', environments: '', image: "${env.IMAGEM_DOCKER}:${VERSAO}", ports: '',
                        service: "${env.NOME_SERVICO}", timeout: 100
                }
            }
        }
        stage('Promover para Produção?') {
            agent none
            when {
                branch 'master'
            	expression {
                    return ! VERSAO.contains('SNAPSHOT')
                }
            }
            steps {
                timeout(10) {
                    rocketSend channel: "${env.CANAL_CHATOPS}", message: "Deploy em produção aguardando aprovação. Job: ${currentBuild.absoluteUrl}", rawMessage: true 
                    script {
                        aprovador = input message: 'ATENÇÃO! Deseja fazer o deploy em produção?', ok: 'Sim',
                        submitter: "${env.APROVADORES}", submitterParameter: 'aprovador'
                        echo "Deploy em produção aprovado por ${aprovador}"
                        DEPLOY_EM_PRODUCAO = true
                    }
                }
            }
        }
        stage('Deploy em produção') {
            when {
                expression {
                    return DEPLOY_EM_PRODUCAO
                }
            }
            steps {
                rocketSend channel: "${env.CANAL_CHATOPS}", message: "Deploy em produção do job ${currentBuild.absoluteUrl} aprovado por ${aprovador}", rawMessage: true 

                rancher confirm: true, startFirst: true, credentialId: 'rancher-server', endpoint: "${env.URL_RANCHER}",
                    environmentId: '1a278', environments: '', image: "${env.IMAGEM_DOCKER}:${VERSAO}", ports: '',
                    service: "${env.NOME_SERVICO}", timeout: 100

                echo 'Atualizando versão do package.json com o comando "npm version"'
                    sshagent(['ssh_git']) {
                        sh "git checkout master"
                        sh "git pull"
                        nodejs(configId: env.CONFIG_NODE_JS, nodeJSInstallationName: env.VERSAO_NODE_JS) {
                            sh 'npm version prepatch --preid=SNAPSHOT'
                        }
                        sh "git push origin master"
                }

                mail to: "${env.EMAIL}, sesap.cenin@camara.leg.br",
                     subject: "Deploy em produção rancher - Job ${env.JOB_NAME}-${env.BUILD_DISPLAY_NAME}",
                     body: """Foi feito deploy em Produção da imagem ${env.IMAGEM_DOCKER}, versão ${VERSAO} no serviço ${env.NOME_SERVICO}.
                     Deploy aprovado por ${aprovador}
                     Url do job: ${currentBuild.absoluteUrl}"""
            }
        }
    }
}
