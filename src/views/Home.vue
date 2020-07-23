<template>
  <v-container>
    <v-row class="mb-4" align-content="center" justify="center">
      <v-col cols="6">
        <v-text-field
          label="Search"
          v-model="movie"
          filled
          prepend-icon="mdi-magnify"
          single-line
          hide-details
          @keyup="GetMovies"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center text-center mt-4" v-show="ShowForm">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="result in results"
        :key="result.title"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img :src="src + result.backdrop_path" height="200px"></v-img>

          <v-card-title>
            {{ result.title }}
          </v-card-title>

          <v-card-subtitle>
            {{ new Date(result.release_date).getFullYear() }}
          </v-card-subtitle>

          <v-card-actions>
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text>
              Explore
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn icon @click="show = !show">
              <v-icon>{{
                show ? "mdi-chevron-up" : "mdi-chevron-down"
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-divider></v-divider>

              <v-card-text>
                {{ result.overview }}
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-card>
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
    show: false,
    movies: [],
    results: [],
    descriptions: [],
    movie: "",
    ShowForm: false,
    src: "https://image.tmdb.org/t/p/original",
    rating: 0.0,
  }),
  methods: {
    GetMovies() {
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
    },
  },
};
</script>
<style scoped></style>
