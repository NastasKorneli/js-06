if (true) {
  const express = require('express'); // commonjs - kann konditional eingebunden werden

  //import express from 'express'; // funktioniert nicht

  import('express').then((express) => {}); // import - kann konditional nur mit der import Methode einegebunden werden.
}
