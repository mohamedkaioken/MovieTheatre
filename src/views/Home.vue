<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-row>
          <v-card
          color="purple"
          dark
          style="max-width: 400px;"
          v-for="result in results"
          :key="result.title"
        >
          <v-row >
            <v-col cols="8">
              <v-card-title>
                <div>
                  <div class="headline">{{result.title}}</div>
                  <div><v-expansion-panels>
                  <v-expansion-panel class="transparent">
                    <v-expansion-panel-header
                      >Over View</v-expansion-panel-header
                    >
                    <v-expansion-panel-content>
                      {{ result.overview }}
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels></div>
                  <div>{{result.release_date}}</div>
                </div>
              </v-card-title>
            </v-col>
            <v-img
              class="shrink ma-2"
              contain
              height="125px"
              :src="src+result.backdrop_path"
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
        </v-row>
        
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "../services/api.service";
export default {
  name: "Home",

  mounted() {
    ApiService.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=18ba471261d253fb5c574c6f1de06e76&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
    ).then((r) => {
      if (r.status == 200) {
        this.movies = r.data;
        this.results = this.movies.results;
        this.descriptions = this.results.map((s) => ({
          description: s.overview,
        }));
        this.ShowTime = false;
      } else {
        console.log(r);
      }
      console.log(this.results);
    });
  },
  data: () => ({
    movies: [],
    results: [],
    descriptions: [],
    src: "https://image.tmdb.org/t/p/original",
     rating: 0.0,
  }),
  methods: {},
};
</script>
<style scoped>
v-menu__content {
  overflow-y: hidden;
}
</style>
