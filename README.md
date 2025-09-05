# Building Frontend Apps with JavaScript

Please review the course prerequisites [here](https://www.liferay.com/web/events/enablement-bootcamp-prerequisites).

## Setting up environments

Here are some simple instructions to prepare your environment before the training starts.

1. Clone the repository to your computer.

    ```
    git clone git@github.com:liferay/liferay-course-building-fe-apps-with-javascript.git
    ```

    Once cloned, navigate into the project's folder.

    ```
    cd liferay-course-building-fe-apps-with-javascript
    ```

1. Perform a git fetch, a day before the training starts, to ensure you have the latest version.

    ```
    git fetch origin
    ```

1. Checkout the main branch.

    ```
    git checkout main
    ```

1. To ensure you have the most recent content for main branch, run the following command.

    ```
    git pull origin main
    ```

1. In the terminal, navigate to the root folder of the repository and run the following command.

    ```
    cd liferay-course-building-fe-apps-with-javascript
    ```

    ```
    blade gw initBundle
    ```

    Or

    ```
    ./gradlew initBundle
    ```

1. After a successful build, run the 'blade server run' command to start your server.

    ```
    blade server run
    ```

    In case you don't have blade installed, run the following command from the workspace's root folder.

    ```
    ./bundles/tomcat/bin/catalina.sh run
    ```

Now, a clean Liferay environment should have started.

1. When finished, access your Liferay DXP instance by going to `localhost:8080` in your browser.

1. Sign in using these credentials.

   * Username: `admin@clarityvisionsolutions.com`
   * Password: `learn`

Once logged in, access the Control Panel &rarr; Search &rarr; Index Actions &rarr; Execute Full Reindex.

And voilà! You're ready for this course!