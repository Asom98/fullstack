import Carousel from 'react-bootstrap/Carousel';

function CarouselComp() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/allef-vinicius-IvQeAVeJULw-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/raphael-lovaski-Pe9IXUuC6QU-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/stefan-schauberger-Tper6bHeSUo-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/hayley-kim-design-sRSRuxkOuzI-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/lina-verovaya-41TbIC5J_l0-unsplash.jpg"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/src/components/Images/hayley-kim-design-sRSRuxkOuzI-unsplash.jpg"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselComp;