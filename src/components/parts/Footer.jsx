import "../css/Footer.css";
export function Footer() {
  return (
    <footer class="my-footer text-center bg-gradient p-3">
      <row class="row">
        <column class="col">
          Contact us:
          <row class="row">
            <column class="col">Phone: +46123456789</column>
          </row>
          <row class="row">
            <column class="col">fullstackg10@gmail.com</column>
          </row>
        </column>
        <column class="col text-center">
          <p class="my-row">Adress:</p>
          <p>Elmetorpsvägen 15, 291 39 Kristianstad</p>
        </column>
        <column class="col">
          <row>Find us on social media</row>
          <row class="row">
            <column class="col">
              <button class="insta" type="button"></button>
            </column>
            <column class="col">
              <button class="facebook" type="button"></button>
            </column>
            <column class="col">
              <button class="twitter" type="button"></button>
            </column>
          </row>
          <row class="row">
            <column class="col">© HKR BEAUTY SALON, 2023</column>
          </row>
        </column>
      </row>
    </footer>
  );
}
