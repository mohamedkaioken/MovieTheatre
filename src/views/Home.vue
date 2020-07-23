<template>
  <v-container>
    <v-row class="mb-4" align-content="center" justify="center">
      <v-col cols="6">
        <v-text-field
          dark
          color="red darken-3" 
          label="Search For Your Favorite Movie"
          v-model="movie"
          filled
          prepend-inner-icon="mdi-magnify"
          single-line
          shaped
          outlined
          hide-details
          solo-inverted
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
      <v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        min-height="200"
        transition="fade-transition"
      >
        <v-card class="mx-auto" max-width="344">
          <v-img :src="src + result.backdrop_path" height="200px"></v-img>

          <div class="overline">{{ new Date(result.release_date).getFullYear() }}</div>
          <v-card-title>>
            {{ result.title }}
          </v-card-title>

          <v-card-subtitle class="text-left">
            <v-chip
              class="ma-1"
              color="primary"
              v-for="genre in result.genre_ids"
              :key="genre"
              small
            >
              {{ genres.find(x => x.id === genre).name }}
            </v-chip>

          </v-card-subtitle>

          <v-card-actions>
            <v-btn small color="yellow darken-2" tile outlined><v-icon left>mdi-star</v-icon>Rate </v-btn>

            <v-btn small>
              <v-icon left>mdi-login-variant</v-icon> Watchlist
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
      </v-lazy>
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
    genres: [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      },
      {
        id: 16,
        name: "Animation"
      },
      {
        id: 35,
        name: "Comedy"
      },
      {
        id: 80,
        name: "Crime"
      },
      {
        id: 99,
        name: "Documentary"
      },
      {
        id: 18,
        name: "Drama"
      },
      {
        id: 10751,
        name: "Family"
      },
      {
        id: 14,
        name: "Fantasy"
      },
      {
        id: 36,
        name: "History"
      },
      {
        id: 27,
        name: "Horror"
      },
      {
        id: 10402,
        name: "Music"
      },
      {
        id: 9648,
        name: "Mystery"
      },
      {
        id: 10749,
        name: "Romance"
      },
      {
        id: 878,
        name: "Science Fiction"
      },
      {
        id: 10770,
        name: "TV Movie"
      },
      {
        id: 53,
        name: "Thriller"
      },
      {
        id: 10752,
        name: "War"
      },
      {
        id: 37,
        name: "Western"
      }
    ]
  }),
  methods: {
    GetMovies() {
      if (this.movie) {
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
  },
};
</script>
<style scoped></style>
