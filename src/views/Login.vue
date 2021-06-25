<template>
  <div
    id="login"
    class="d-flex align-items-center justify-content-center position-relative pt-5"
  >
    <div class="container">
      <div class="row login-content">
        <div class="col-md-12">
          <img id="logo" src="@/assets/logo.png" alt="logo.png" />
          <div class="d-flex align-items-center justify-content-center py-4">
            <i
              ><img
                src="@/assets/icones/login/icone-rei.png"
                alt="icone-rei.png"
            /></i>
            <h1 class="color-fff pl-3">Cronograma de vacinação.</h1>
          </div>
        </div>
        <div class="col-md-6 position-relative">
          <h2 class="color-fff position-absolute centraliza-absolute">
            VACINAÇÃO COVID 
          </h2>
          <img
            id="tabuleiroIMG"
            src="@/assets/chess-login.png"
            alt="chess-login.png"
          />
          <!-- <theTabuleiro :dadosExercicioAluno="dadosExercicioVisitante"/> -->
        </div>
        <div
          class="col-md-6 d-flex align-items-center justify-content-center bg-ebebeb"
        >
          <div>
            <h2>Entrar</h2>
            <div class="mt-4 mb-3">
              <router-link class="color-0e5caf"
                ><span class="color-000">Usuário novo? </span
                ><strong class="ml-2">Crie uma conta</strong></router-link
              >
            </div>
            
                <!-- <div class="control" :class="classes">
                  <div class="position-relative">
                    <span
                      @click.prevent="changeCpfCod"
                      id="changeCpfCod"
                      :class="
                        `position-absolute bg-000  d-flex j-c-center hoverStyleButton`
                      "
                      ><i class="fas fa-exchange-alt color-fff"></i
                    ></span>
                  </div> -->
                  
                </div>
              
             
                
                <revelaSenha
                  placeholder="Senha"
                  type="password"
                  v-model="formLogar.password"
                />
                <div class="text-left">
                  <span v-bind="ariaMsg" class="span-status-validate">{{
                    errors[0]
                  }}</span>
                </div>
              </ValidationProvider>
              <div class="w-100 d-flex j-c-center mt-2 mb-4 checker">
                <div class="Ochecker d-flex j-c-center" @click="checking">
                  <img
                    class="checker-img d-block"
                    src="@/assets/icones/Check.png"
                    alt="Check.png"
                    style="margin-bottom: 4px; margin-left: 1px;"
                  />
                </div>
                <div>
                  <p class="ml-3">Manter minha conta conectada</p>
                </div>
              </div>
              <div class="col-md-12">
                <button
                  type="submit"
                  class="text-uppercase bg-0e5caf f-w-700 color-fff"
                  :disabled="disabled"
                >
                  {{ statusLogin }}
                  <div v-if="show" class="spinner-border" role="status">
                    <span class="sr-only"></span>
                  </div>
                </button>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  
</template>

<script>
import { mapGetters } from "vuex";
import theTabuleiro from "@/components/theTabuleiro";
import revelaSenha from "@/components/senha/revelaSenha";

export default {
  name: "Login",
  data() {
    return {
      statusChecker: true,
      statusLogin: "Entrar",
      show: false,
      disabled: false,
      wayLogin: 1,
      rotaTo: null,

      formLogar: {
        cpf: null,
        cod: null,
        password: null,
      },
      unidade: "",
      linkar: false,
      dadosExercicioVisitante: {
        fen: "2kr2nr/1pp2ppp/3b4/1P3q2/2Pp1B2/5Q1P/RP3PP1/R5K1 w - - 0 1",
        cor: "white",
      },
    };
  },
  computed: {
    ...mapGetters(["getUserDatas"]),
  },
  components: {
    theTabuleiro,
    revelaSenha,
  },
  watch: {
    getUserDatas: function() {
      setTimeout(() => {
        if (this.getUserDatas.profile_id != 3) {
          this.$router.push(
            `/${this.verifyStatus(
              this.getUserDatas.profile_id
            ).toLowerCase()}/inicial`
          );
        } else {
          this.getCoordenadorUnidade(this.getUserDatas.unidade_id);
        }
      }, 500);
    },
  },
  mounted() {},
  methods: {
    carregaUsuarios() {
      if (this.$store.getters.getUserDatas.profile_id != 5) {
        this.$store
          .dispatch(
            "getDadosDeTodosUsuarios",
            this.$store.getters.getPerfilToken
          )
          .then((resolve) => {
            if (resolve.valid) {
              this.toastGlobal("success", `Dados carregados com sucesso`);
            } else {
              this.toastGlobal(
                "error",
                `Algo de errado ocorreu, alguns dados não foram carregados ${resolve.msg.responseJSON.msg}`
              );
            }
          });
      }
    },
    checking() {
      if ($(".checker-img").hasClass("d-block")) {
        $(".checker-img")
          .removeClass("d-block")
          .addClass("d-none");
        this.statusChecker = false;
      } else {
        $(".checker-img")
          .removeClass("d-none")
          .addClass("d-block");
        this.statusChecker = true;
      }
    },
    // teste(){
    //     this.logar()
    //     console.log("teste enter",teste)
    // },
    logar() {
      this.disabled = true;
      console.log(this.$store.getters.getUserDatas);
      if (this.wayLogin == 0) delete this.formLogar.cod;
      else if (this.wayLogin == 1) delete this.formLogar.cpf;
      this.$refs.form.validate().then((success) => {
        if (success) {
          this.disabled = true;
          this.$store;
          this.statusLogin = "";
          this.show = true;
          if (this.formLogar.cod)
            this.formLogar.cod = this.formLogar.cod.replace(/[^\d]+/g, "");
          if (this.formLogar.cpf)
            this.formLogar.cpf = this.formLogar.cpf.replace(/[^\d]+/g, "");
          this.$store.dispatch("login", this.formLogar).then((resolve) => {
            console.log(">><<<<<<<<<<<>>", resolve);
            this.disabled = false;
            if (resolve.valid) {
              this.carregaUsuarios();
              this.$nextTick(() => {
                setTimeout(() => {
                  if (this.getUserDatas.name) {
                    this.toastGlobal(
                      "success",
                      `Bem-vindo ao Skaki ${this.getUserDatas.name}`
                    );
                  }
                  this.linkar = true;
                }, 1000);
                setTimeout(() => {
                  location.reload();
                }, 2000);
              });
            } else {
              this.toastGlobal("error", resolve.msg.responseJSON.msg);
            }
            (this.statusLogin = "Entrar"), (this.show = false);
          });
        }
        this.disabled = false;
      });
    },
    getCoordenadorUnidade(id) {
      $.ajax({
        async: true,
        type: "GET",
        url: `${this.VUE_APP_CMS}api/unidades/${id}`,
        dataType: "json",
        headers: {
          Authorization: this.$store.getters.getPerfilToken,
        },
        success: (response) => {
          this.$store.commit("SET_UNIDADE_USER", response.name);
          this.$router.push(
            `/${this.verifyStatus(
              this.$store.getters.getUserDatas.profile_id
            ).toLowerCase()}/${this.$store.getters.getUserDatas.unidade_id}/${
              response.name
            }`
          );
        },
      });
    },
    changeCpfCod() {
      this.formLogar.cpf = null;
      this.formLogar.cod = null;
      this.wayLogin = this.wayLogin == 0 ? 1 : 0;
    },
  },
};
</script>

<style scoped>
@import "../style/telasDeLogin.css";

.centraliza-absolute {
  font-size: 27px;
  line-height: 1.8;
}

#tabuleiroIMG {
  background-color: rgb(196, 222, 251);
}

#changeCpfCod,
#changeCodCpf {
  width: 40px;
  height: 40px;
  right: -55px;
  border-radius: 5px;
}

#changeCpfCod:hover,
#changeCodCpf:hover {
  cursor: pointer;
}
</style>
