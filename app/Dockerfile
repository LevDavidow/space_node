FROM arhea/yarn:6

# set the working directory to our source root
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY typings.json /usr/src/app
COPY yarn.lock /usr/src/app

# install the dependencies
RUN yarn install
RUN yarn global add typings nodemon
RUN typings install

# copy source code
COPY . /usr/src/app

# replace this with your application's default port
EXPOSE 3500
