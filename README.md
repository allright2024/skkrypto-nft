# api-and-react

## 준비사항
#### - anaconda설치해서 가상환경 만들고 python 라이브러리 설치(pip install ~~)
#### - npx create-react-app pybo로 pybo 폴더에 react 설치
#### - npm install 명령어를 통해 필요한 라이브러리 설치
#### - mysql 설치 후 skkrypto라는 이름의 database를 만들고 해당 데이터베이스 안에 user, userinfo, transaction이라는 table 생성.
##### table 정보는 pybo/model폴더의 user_model.py에 있음.(column 이름 똑같이 해야 에러 뜨지 않음.)
##### SQL문은 아래와 같음 

CREATE DATABASE skkrypto;
use skkrypto;

CREATE TABLE userinfo(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
_userid varchar(64) NOT NULL,
_userpw varchar(32) NOT NULL,
_useremail varchar(32) NOT NULL
);

CREATE TABLE user(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
_username varchar(64) NOT NULL,
_pointA int NOT NULL,
_pointB int NOT NULL,
_pointC int NOT NULL,
_pointD int NOT NULL
);

CREATE TABLE transaction(
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
_from varchar(64) NOT NULL,
_to varchar(64) NOT NULL,
_point int NOT NULL,
_type varchar(10) NOT NULL,
_date varchar(32)
);

### 진행 중 추가사항(9.30)
alter table userinfo add column _hash VARCHAR(32);
alter table userinfo add UNIQUE (_userid); 
alter table user add UNIQUE (_username);
alter table userinfo add FOREIGN KEY(_userid) REFERENCES user(_username);

#### - __init__.py 파일에서 db={...} dictionary 내용 환경에 맞게 변경.

## 실행 방법
#### - python start.py로 api 실행
#### - 프로젝트 디렉토리에서 cd pybo 후에 npm start
#### - 제대로 연동되는지 확인하기 
INSERT INTO transaction VALUES(1,"Alice","Bob",5,"1","2021-09-22", NULL) 쿼리문 넣어주고, from ALice 'Search tx'창에서 제대로 뜨나 확인

## 그외 나머지 정보 
#### - pybo/model 폴더에 user_model.py가 있는데 skkrypto라는 데이터베이스 내에서 table을 추가하면 user_model.py에 새로운 class 추가해서 적용.
