import React from 'react';
import './Tribu.css'; // Importa el archivo CSS

const Tribu = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="background-carousel">
        <div className="background-image bg1"></div>
      </div>
      <div className="flex justify-center items-center h-full bg-gray-100 bg-opacity-75 p-4 relative z-10">
        <div className="w-full max-w-5xl mx-auto p-4" style={{ margin: '5%' }}>
          <h1 className="text-5xl font-bold mb-4">La Tribu</h1>
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-semibold mb-2">Nuestra Historia</h2>
            <p className="text-gray-800 bg-pink-100 p-4 rounded-lg text-lg leading-relaxed">
              La Tribu
              Tribu de Mamás es una comunidad de mujeres, en etapas de embarazo y maternidad temprana, que se unen para crear una red de apoyo y contención a lo largo del duro camino que conlleva ser mamá.
              <br /><br />
              En conjunto compartimos experiencias, consejos, datos, desahogos y espacios de desconexión (juntas sin hijos!) para hacer más llevadera la maternidad. Hablamos de cosas que nadie nos contó y que tuvimos que aprender desde que supimos que nuestro/a hijo/a venía en camino; pero acá, sin juzgar. Aceptamos amar y odiar la maternidad al mismo tiempo, aceptamos equivocarnos y volver a empezar, aceptamos nuestros enojos y celebramos los momentos de paz de cada una, porque si no nos aceptamos con nuestros verdaderos sentimientos, entonces ¿cómo nos vamos a entender?
              <br /><br />
              En esta tribu creamos instancias donde nos juntamos con nuestros hijos y otras donde nos reunimos sólo entre mamás (un pisco sour nunca está demás), siempre teniendo como objetivo sentirnos un poco más acompañadas y comprendidas después de vernos.
              <br /><br />
              La crianza nunca más debe ser solitaria, la crianza hoy es de #TodasEnTribu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tribu;