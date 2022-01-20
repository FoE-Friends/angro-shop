import "./pugImport";

import "../scss/styles.scss";
import "../javascripts/app";

if (module.hot) {
  module.hot.accept(console.error);
  module.hot.dispose(() => {
    window.location.reload();
  });
}
// css images
import "../assets/images/main-bg.png";
import "../assets/images/thanks-bg.png";
