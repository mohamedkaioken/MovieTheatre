<template>
  <v-container>
    <v-row class="mb-4" align-content="center" justify="center">
      <v-col cols="12" xl="12" lg="6" md="12" sm="12" xs="12">
        <v-text-field
          label="Search"
          v-model="movie"
          filled
          prepend-icon="mdi-magnify"
          single-line
          hide-details
          @keyup="GetMovies"
        ></v-text-field>
        <!-- <v-btn fab dark @click="GetMovies">
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->
        <!-- <v-carousel>
          <v-carousel-item
            v-for="(result, i) in results"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
          <v-card  class="mx-auto pa-5 transition-swing card" dark>
            <v-img
              :src="src+result.poster_path"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="result.title"></v-card-title>
            </v-img>
                    
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-list class="transparent">
                            <v-list-item>
                              <v-list-item-title>Release Date :</v-list-item-title>
                              <v-list-item-subtitle
                                class="text-right"
                              >{{new Date(result.release_date).getFullYear()}}</v-list-item-subtitle>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>Over View:</v-list-item-title>
                              <v-list-item-subtitle
                                class="text-right"
                              >{{result.overview}}</v-list-item-subtitle>
                            </v-list-item>
                          </v-list>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>

          </v-carousel-item>
        </v-carousel> -->
        <v-col>
          <v-card
            color="purple"
            dark
            style="max-width: 400px;"
            v-for="result in results"
            :key="result.title"
            v-show="ShowForm"
          >
            <v-row>
              <v-col cols="8">
                <v-card-title>
                  <div>
                    <div class="headline">{{ result.title }}</div>
                    <div>
                      <v-expansion-panels>
                        <v-expansion-panel class="transparent">
                          <v-expansion-panel-header
                            >Over View</v-expansion-panel-header
                          >
                          <v-expansion-panel-content>
                            {{ result.overview }}
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                    <div>{{ result.release_date }}</div>
                  </div>
                </v-card-title>
              </v-col>
              <v-img
                class="shrink ma-2"
                contain
                height="125px"
                :src="src + result.backdrop_path"
                style="flex-basis: 125px"
              ></v-img>
            </v-row>
            <v-divider dark></v-divider>
            <v-card-actions class="pa-4">
              Rate this album
              <v-spacer></v-spacer>
              <span class="grey--text text--lighten-2 caption mr-2">
                ({{ rating }})
              </span>
              <v-rating
                v-model="rating"
                background-color="white"
                color="yellow accent-4"
                dense
                half-increments
                hover
                size="18"
              ></v-rating>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  name: "Home",

  mounted() {
    
    //   ApiService.get(
    //   `https://api.themoviedb.org/3/search/movie?api_key=18ba471261d253fb5c574c6f1de06e76&query="+${this.movie}"`
    // ).then((r) => {
    //   if (r.status == 200) {
    //     this.movies = r.data;
    //     this.results = this.movies.results;
    //     this.descriptions = this.results.map((s) => ({
    //       description: s.overview,
    //     }));
    //     this.ShowTime = false;
    //   } else {
    //     console.log(r);
    //   }
    //   console.log(this.results);
    // });

    
  },
  data: () => ({
    movies: [],
    results: [],
    descriptions: [],
    movie: '',
    ShowForm:false,
    src: "https://image.tmdb.org/t/p/original",
    rating: 0.0,
  }),
  methods: {
    GetMovies(){
      ApiService.get(
      `https://api.themoviedb.org/3/search/movie?api_key=18ba471261d253fb5c574c6f1de06e76&query=${this.movie}`
    ).then((r) => {
      if (r.status == 200) {
        this.movies = r.data;
        this.results = this.movies.results;
        this.descriptions = this.results.map((s) => ({
          description: s.overview,
        }));
        this.ShowForm = true;
      } else {
        console.log(r);
      }
      console.log(this.results);
    });
    }
  },
};
</script>
<style scoped>
v-menu__content {
  overflow-y: hidden;
}
</style>
