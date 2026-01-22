import SectionContainer from "../layout/SectionContainer";

export default function DetailVideoCategoryColumn() {
  return (
    <SectionContainer padded className="py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* LEFT: video */}
        <div className="w-full">
          <video
            className="w-full aspect-video object-cover"
            controls
            poster="/images/poster-video-demo-1.jpg"
          >
            <source src="/videos/video-1.mp4" type="video/mp4" />
          </video>
        </div>

        {/* RIGHT: text */}
        <div className="flex">
          <p className="text-sm leading-6 text-black/75">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            eget ligula nisl. Nulla sit amet mauris tempus, venenatis quam vel,
            feugiat magna. Curabitur aliquet molestie risus, in iaculis dui
            pellentesque vel. Vestibulum ut augue quis lectus volutpat egestas.
            Aenean euismod quam quis orci iaculis eleifend. Etiam feugiat, justo
            et auctor egestas, nulla urna rhoncus arcu,
            <br />
            igula nisl. Nulla sit amet mauris tempus, venenatis quam vel,
            feugiat magna. Curabitur aliquet molestie risus, in iaculis dui
            pellentesque vel. Vestibulum ut augue quis lectus volutpat egestas.
            Aenean euismod quam quis orci iaculis eleifend. Etiam feugiat, justo
            et auctor egestas, nulla urna rhoncus arcu,
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
