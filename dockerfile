# base image
# dockerhub에서 앞으로 이용할 image를 pulling합니다.
FROM node:latest
# 12.2.0-alpine

# FROM node:slim

# set working directory
# 해당 작업은 local과 동일시된 위치에서 진행되어야 하므로
# docker-compose > service > backend > volumes에서 지정된 container의 경로와 동일하게 설정해야합니다.

WORKDIR /app

COPY . /app

# `/app/node_modules/.bin`을 $PATH 에 추가
# ENV PATH /app/node_modules/.bin:$PATH

# RUN npm install -g create-react-app

# app dependencies, install 및 caching
# COPY /package.json /app/package.json
# local에 위치한 /react/package.json 파일을 docker container의 /app/package.json로 복사합니다. 
# package.json은 flask의 requirements.txt와 같은 역할을 합니다.

# RUN npm install
# npm package를 다운로드합니다.
# RUN npm install react-scripts@4.0.3 -g
# 우리의 react 버전은 4.0.3입니다.

# COPY . ./

# ??????????????????????????????????????????????????????????????????
# start를 하면 수정된 코드가 반영되기 때문에 배포용에서는 start를 하지 않는다.

# RUN npm run start 

# 처음 시작했을때만 실행하는 명령어
# 사실 frontend>build 파일만 생기면 필요없음
# CMD npm run build

# 두번째 부터는 해당 명령어 사용
# RUN npm run build 

# 앱 실행
# CMD ["npm", "build"]
