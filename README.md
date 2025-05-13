## 현재 개발 상황
로그인화면(Login.js)에서 DB에 저장되어 있는 이메일과 비밀번호를 입력하고 로그인 버튼을 누르면 Welcome.js 화면으로 이동합니다.

만약 DB에 정보가 없으면 에러 발생.

<br/>

로그인화면(Login.js) 상단에 '회원가입' 링크 텍스트을 누르면 회원가입화면(Signup.js)으로 이동합니다.

사용자 이름과 사용자 이메일, 비밀번호, 비밀번호재확인 필드에 유효한 값으로 입력하고 회원가입 버튼을 누르면 DB에 정보가 저장되며 Welcome.js 화면으로 이동합니다.

이메일 형식이 올바르지 않거나 이메일이 이미 DB에 있는 경우, 비밀번호와 비밀번호재확인 값이 일치하지 않는다면 에러 발생.

<br/>

로그인화면(Login.js) 상단에 '강사로그인' 링크 텍스트을 누르면 강사로그인화면(Logininst.js)으로 이동합니다.

DB에 저장된 하나의 정보로만 로그인 가능하도록 했습니다.

  
<br/>
userEmail: master@gmail.com
<br/>
userPw: 11111111
<br/>
userName: 박진만
<br/>
참고로 userNum 은 PK, NN, AI입니다.



## 개발해야 하는 것
1. 레슨 추가/생성(insert), 수정(update), 삭제(delete), 나열(list) 프론트 화면 구현 및 백엔드 모델 구현
근데 delete는 파라미터만 보내면 되니까 모델구현은 안 해도...
2. 클래스 선택 페이지(Classlist.js) 중급자, 전문가, 자격증
3.  찜, 장바구니, 주문내역 마이페이지 구현
4. 레슨 상세페이지(LessonDetail.js)의 배경이미지, 강사프로필이미지, 강사명, 레슨명, 가격, 위치, 레슨설명, 강사 경력 및 자격증, 시간
5. 레슨 상세페이지(LessonDetail.js)의 시간을 누르면 레슨 옵션페이지(LessonOption.js)로 이동하는데, 화면 구현
6. db에 레슨배경이미지 데이터 어트리뷰트 추가
등등...

<br/>
<br/>
## DB import

DB는 MySQL에서 최근 카톡에 올려놓은  `Dump20250325.sql ` import 하시면 됩니다.

![image](https://github.com/user-attachments/assets/167b8cb4-01b1-4253-8b58-d547b84ce086)


위 사진처럼 스키마명 수정하세요.

참고로 제 MySQL 버전은  `8.0.21 `입니다. < 상관있을까요?



<br/>
<br/>

## db.js 일부 코드 수정 
 ```
// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0809',
    database: 'parkgolf_db',
});
 ```
이 코드를

 ```
// MySQL 연결 설정
const db = mysql.createConnection({
    host: '본인 MySQL의 Hostname',
    user: '본인 MySQL의 Username',
    password: '본인 MySQL의 Password ',
    database: 'parkgolf_db',
});
 ```
로 수정하세요

<br/>
<br/>

## package.json의 패키지 설치 
 ```
npm install
 ```
설치 안 되면 하나씩 따로 설치 하세요.

<br/>
<br/>

## 실행
nodejsexpress 폴더에서 터미널에
 ```
 nodemon server.js
 ```
`node`도 가능하지만 자동재시작 `nodemon` 어떠십니까

실행 안 되면 `nodemon` 설치 후 실행하세요.

