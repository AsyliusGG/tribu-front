import React from "react";

const Historia = () => {
  return (
    <div className="bg-[#fef8f5] py-16 px-4 md:px-8 lg:px-16 xl:px-32">
      {/* Título */}
      <h1 className="text-center text-4xl font-bold mb-8">
        Cómo nació la Tribu de Mamás
      </h1>

      {/* Contenido del texto */}
      <div className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-700">
        <p className="mb-6">
          Durante muchos años la crianza de nuestros hijos ha sido juzgada por
          la sociedad. No podemos quejarnos ni equivocarnos, no podemos quedar
          gordas ni enfermarnos, no podemos trabajar pero tampoco quedarnos en
          la casa...
        </p>
        <p className="mb-6">
          Por todo esto, un grupo de amigas desesperadas en sus propias
          experiencias en el embarazo y la maternidad, se dieron cuenta de que
          si bien hay un lado lindo y gratificante, también existe el lado
          oscuro y solitario del que nadie habla.
        </p>
        <p className="mb-6">
          Fue así como formamos este grupo para desahogarnos y apoyarnos, para
          reclamar, llorar y reir. Para quejarnos de nuestros hijos y parejas
          para después compartir los momentos lindos con ellos. Todo esto,
          porque queremos sentirnos libres de compartir el lado malo y sentirnos
          acompañadas y comprendidas (porque nos dimos cuenta que todas pasamos
          por las mismas cosas buenas y malas!!)
        </p>
        <p className="mb-6">
          El embarazo y la crianza pueden ser mucho más gratificantes cuando
          podemos compartir entre nosotras, cuando creamos redes de apoyo que
          son fundamentales en esta etapa.
        </p>
        <p className="mb-6 text-center font-semibold">
          Las invitamos a seguir haciendo crecer esta tribu, porque la crianza
          hoy es de <span className="font-bold">#TodasEnTribu</span>
        </p>
      </div>

      {/* Título de fundadoras */}
      <h2 className="text-center text-2xl font-bold mt-12 mb-8">
        Fundadoras Tribu de Mamás
      </h2>

      {/* Imágenes de las fundadoras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Fundadora 1"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Fundadora 2"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Fundadora 3"
            className="rounded-lg"
          />
        </div>
        <div className="flex justify-center">
          <img
            src="https://via.placeholder.com/200"
            alt="Fundadora 4"
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Historia;
