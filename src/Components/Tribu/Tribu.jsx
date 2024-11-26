import React from 'react';
import './Tribu.css';

const Tribu = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="background-carousel">
        <div className="background-image bg1"></div>
      </div>
      <div className="flex justify-center items-center h-full overflow-hidden bg-gray-100 bg-opacity-75 p-4 relative z-10">
        <div className="w-full max-w-5xl mx-auto p-4" style={{ margin: '5%' }}>
          <h1 className="text-5xl font-bold mb-4 text-center text-pink-300">¿Qué es "La Tribu"?</h1>
          <div
            className="p-6 rounded-lg shadow-lg mb-4"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }} // Fondo blanco con opacidad del 80%
          >
            <p className="text-gray-800 bg-pink-100 p-4 rounded-lg text-lg leading-relaxed">
              <strong className="text-pink-500">Tribu de Mamás</strong> es una comunidad de mujeres en etapa de embarazo y maternidad temprana (con hijos de 0 a 5 años), que se unen para crear una red de apoyo y contención a lo largo del duro camino que conlleva ser mamá.
              <br /><br />
              En conjunto compartimos experiencias, consejos, datos, desahogos y espacios de desconexión (juntas sin hijos!) para hacer más llevadera la maternidad. Hablamos de cosas que nadie nos contó y que tuvimos que aprender desde que supimos que nuestro/a hijo/a venía en camino; pero acá, sin juzgar. Aceptamos amar y odiar la maternidad al mismo tiempo, aceptamos equivocarnos y volver a empezar, aceptamos nuestros enojos y celebramos los momentos de paz de cada una, porque si no nos aceptamos con nuestros verdaderos sentimientos, entonces ¿cómo nos vamos a entender entre nosotras?
              <br /><br />
              En esta tribu creamos instancias donde nos juntamos con nuestros hijos (las famosas <strong className="text-pink-500">Playdates</strong>) y otras donde nos reunimos sólo entre mamás (un pisco sour nunca está demás en la gran y esperada <strong className="text-pink-500">Mom's Night</strong>), siempre teniendo como objetivo sentirnos un poco más acompañadas y comprendidas después de vernos.
              <br /><br />
              Entonces, ¿qué buscamos fomentar?
              <ol className="list-decimal ml-8 mt-4">
                <li>Conectar con mamás que vivan dentro del mismo sector para facilitar encuentros y apoyo mutuo.</li>
                <li>La creación de vínculos entre mamás cuyos hijos estén en etapas similares de desarrollo.</li>
                <li>La formación de amistades basadas en intereses y experiencias compartidas en la maternidad.</li>
              </ol>
              <br />
              La crianza nunca más debe ser solitaria, la crianza hoy es de <strong className="text-pink-500">#TodasEnTribu</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tribu;
