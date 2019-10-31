//--------------------
//HANDLERS
//--------------------
$(() => {
  // //Wait for DOM Load...
  // document.addEventListener("DOMContentLoaded", function(){
  //   //Modals
  //   const loginModal = document.getElementById('loginModal');
  //   const registerModal = document.getElementById('registerModal');
  //   document.getElementById('loginClick').addEventListener("click", updateModal(loginModal));
  //   document.getElementById('registerClick').addEventListener("click", updateModal(registerModal));
  // }, false);
  //


  // handler to update modal styling
  const updateLoginModal = () => {
    const $loginModal = $('#loginModal');
    if($loginModal.css('display') === "none") {
      $loginModal.css('display') = "block";
    } else {
      $loginModal.css('display') = "none";
    }
  }
  const updateRegisterModal = () => {
    const $registerModal = $('#registerModal');
    if($registerModal.css('display') === "none") {
      $registerModal.css('display') = "block";
    } else {
      $registerModal.css('display') = "none";
    }
  }
})
