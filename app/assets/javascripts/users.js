/* global $, Stripe */
//Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var signupBtn = $('#form-signup-btn');
  
  //Set Stripe public key
  Stripe.setPublishableKey( $('meta[NAME="stripe-key"]').attr('content'));
  //When user clicks form submit btn
  submitBtn.click(function(event){
    //prevent default submission behaviour.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true)
    
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    //Use Stripe JS library to check for card errors.
    var error = false;
    
    //Validate card number.
    if(!Stripe.card.vaildateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid')
    }
    
     //Validate CVC number.
    if(!Stripe.card.vaildateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid')
      
     //Validate expiration date.
    if(!Stripe.card.vaildateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration appears to be invalid')
        
    if (error) {
      //If there are card error, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
       //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum, 
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResonseHandler);
    }
   
    
    return false;
  });
  
  //Stripe will return a card token
  function stripeResonseHandler(status, response) {
    //Get the token from the response
    var token = response.id;
    
    //Inject the card token in a hidden field.
    theForm.append($('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    
    //Inject card token as hidden field into form
    theForm.get(0).submit();
  }
  
   //Submit form to our rails app.
   
   
});