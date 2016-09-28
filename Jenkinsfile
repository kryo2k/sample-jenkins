node {
  sh 'echo "-- BUILD: $BUILD_NUMBER --"'

  currentBuild.result = "SUCCESS"

  
  try {
    stage 'Checkout'
      checkout scm

    stage 'Test'
      env.NODE_ENV = "test"

      print "NodeJS Environment: ${env.NODE_ENV}"

      sh 'node -v'
      sh 'npm prune'
      sh 'npm install'
      sh 'npm test'

    stage 'Cleanup'
      sh 'npm prune'
      sh 'rm -rf node_modules'
  }
  catch(err) {
    currentBuild.result = "FAILURE"
    throw err
  }
}

