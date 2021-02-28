<template>
  <ion-page>
    <ion-toolbar
      size="small"
    >
      <ion-title>Login</ion-title>
    </ion-toolbar>
    <ion-content :fullscreen="true">
      <div class="div-center-container">
        <div class="center-item">
          <ion-grid class="ion-grid-padding-top">
            <!-- phone No -->
            <form
              action="getCode"
              v-if="step=='ASKPHONE'"
            >
              <ion-row class="ion-padding-top ion-justify-content-center">
                <ion-item>
                  <ion-label
                    position="stacked"
                  >
                    Enter phone no with country code
                  </ion-label>
                  <ion-input
                    placeholder="+91 9999999999"
                    v-model="$v.phoneNo.$model"
                    
                  ></ion-input>
                </ion-item>
              </ion-row>
              <ion-row class="ion-padding-top ion-justify-content-center"
                v-if="$v.phoneNo.$dirty && $v.phoneNo.$invalid"
              >
                <ion-text
                    color="danger"
                  >
                    <h6
                      v-if="$v.phoneNo.$dirty && $v.phoneNo.required.$invalid"
                    >
                      Phone no required</h6>
                    <h6
                      v-if="$v.phoneNo.$dirty && !$v.phoneNo.required.$invalid && $v.phoneNo.format.$invalid"
                    >
                      Not a valid phone no
                    </h6>
                  </ion-text>
              </ion-row>
              
              <ion-row class="ion-padding-top ion-justify-content-center">
                <button 
                  type="submit"
                  class="custom-button"
                  id="sign-in-button"
                  v-show="!$v.phoneNo.$invalid"
                >
                  Get code 
                </button>
              </ion-row>
            </form>
            <!-- code -->
            <form
              v-if="step=='ASKCODE'"
            >
              <ion-row class="ion-padding-top ion-justify-content-center">
                <ion-item>
                  <ion-label
                    position="stacked"
                  >
                    Enter 6 digit code
                  </ion-label>
                  <ion-input
                    placeholder=""
                    maxlength="6"
                    minlength="6"
                    tye="number"
                    v-model="code"
                  ></ion-input>
                </ion-item>
              </ion-row>
              <ion-row class="ion-padding-top ion-justify-content-center"
                v-if="isCodeInvalid"
              >
                <ion-text
                    color="danger"
                  >
                    <h6>Invalid code</h6>
                  </ion-text>
              </ion-row>
              <ion-row class="ion-padding-top ion-justify-content-center">
                <ion-button
                  type="button"
                  @click="verifyCode"
                  expand="block"
                  fill="solid"
                >
                  Sign in
                </ion-button>
                
              </ion-row>
            </form>
          </ion-grid>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonContent, IonPage, IonGrid, IonRow, IonInput, IonToolbar, IonTitle } from '@ionic/vue';
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'
import Firebase from '../api/firebase'
export default {
  setup () {
    return {
      $v: useVuelidate()
    }
  },
  name: 'PhoneSignIn',
  components: {
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonInput,
    IonToolbar,
    IonTitle
  },
  data () {
    return {
      auth: null,
      phoneNo:'',
      code: '',
      step: 'ASKPHONE',
      confirmationResult: null,
      user: null,
      isCodeInvalid: false
    }
  },
  validations () {
    const phoneNoRegex = /^([0|\+[0-9]{3,4})?([0-9]{10})$/
    // const pattern = helpers.regex('pattern', /^([0|\+[0-9]{3,4})?([0-9]{10})$/)
    return {
      phoneNo: {
        required,
        format (phoneNo) {
          console.log(phoneNo)
          return phoneNoRegex.test(phoneNo)
        }
      }
    }
  },
  mounted () {
    Firebase.auth().useDeviceLanguage()
    const getCode = this.getCode
    window.recaptchaVerifier = new Firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': this.getCode
    });
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    })
  },
  methods: {
    getCode () {
      console.log('get code')
      // let step = this.step
      // let confirmationResult = this.confirmationResult
      Firebase.auth()
        .signInWithPhoneNumber(this.phoneNo, window.recaptchaVerifier)
          .then((result) => {
            console.log('SMS sent')
            //must have received verification code 
            this.step = 'ASKCODE'
            this.confirmationResult = result
          })
          .catch(function (err) {
            console.error(err)
          })
    },
    verifyCode () {
      // sign in
      console.log('sign called')
      this.confirmationResult.confirm(this.code)
      .then((result) => {
          this.user = result.user
          console.log(this.user)
      })
      .catch( err => {
        this.isCodeInvalid = true
        console.log(err)
      })
    }
  }
};
</script>

<style >
.custom-button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 1rem 2rem;
  margin: 1.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.button:disabled,
.button[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
</style>