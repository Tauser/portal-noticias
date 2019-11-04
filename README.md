# HOME - PORTAL DE NOTÍCIAS DA CÂMARA DOS DEPUTADOS

## Configurações node e certificados da Câmara
A versão recomendada do Node.js é a v8.12.0

Para que o node reconheça certificados assinados pela Autoridade Certificadora da Câmara, defina uma variável de ambiente apontando para o arquivo com o certificado da [AC raiz da Câmara](https://git.camara.gov.br/sepop/docker/raw/master/node/AC-Raiz-CD.crt) (exportado no formato PEM). Exemplo:

```
export NODE_EXTRA_CA_CERTS="/usr/local/share/ca-certificates/AC-Raiz-CD.crt"
```

## Configuração do servidor npm da Câmara

Para apontar para o servidor de bibliotecas do npm da Câmara (mais rápido do que ir na internet), use essa configuração no seu arquivo .npmrc, localizado na pasta home do seu usuário:

```
registry=https://hub.camara.gov.br/repository/npm-camara/
```

Ainda nesse mesmo arquivo, é preciso usar a seguinte configuração:

```
strict-ssl=true
```

## Executar localmente

Para executar localmente, use
```
npm install
npm run dev
```

A home está disponível em http://localhost:3000/portal-noticias/

Para executar os testes, use
```
npm run test
```

## Publicar nova versão

A publicação é feita por um pipeline no Jenkins sempre que a versão do package.json não possuir 'SNAPSHOT' no nome (ver Jenkinsfile). O número de versão segue o padrão conhecido como [semantic version](https://docs.npmjs.com/getting-started/semantic-versioning), de maneira que o comando usado para mudar a versão depende de um dos casos abaixo.

- Para gerar uma versão de correção de bug na última versão, rodar na sua máquina:

```
npm version patch
git push --follow-tags
```

- Para gerar uma versão da biblioteca com novas funcionalidades, sem quebrar clientes atuais da biblioteca

```
npm version minor
git push --follow-tags
```

- Para gerar uma versão da biblioteca com grandes mudanças, possivelmente quebrando clientes atuais da biblioteca

```
npm version major
git push --follow-tags
```

O comando npm acima já atualiza o package.json, faz commit e cria uma nova tag.
