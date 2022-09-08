import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
  },
  tr: {
    translation: {
      "Support A Child's Education": "Bir çocuğun geleceğini destekle",
      "Quality Education is every child's right.": "Nitelikli eğitim her çocuğun hakkıdır.",
      "Support a Child": "Destekle",
      "Join Us to Help": "Yardım etmek için bize katıl",
      "Volunteer and help children to get them quality education.":" Gönüllü olarak bize katılın ve çocuklara nitelikli eğitim alması için yardım edin.",
      "Join Us":"Bize Katıl",
      "Why Quality Education is Important?":"Nitelikli Eğitim Neden Önemli?",
      "Education is the key for succeding in many Sustainable Development Goals(SDGs). People can walk away from poverty when they got quality education. That's why Education helps decreasing inequality and ensure social gender equality. Also helps to have a healthy and sustainable life wherever people are. Education also helps to improve clemency and build a peaceful society.":"Eğitim bir çok Sürdürülebilir Kalkınma Hedefinin anahtarıdır. İnsanlar nitelikli eğitim alabildiklerinde yoksulluk girdabından da kurtulabilirler. Bu nedenle eğitim eşitsizliklerinin azaltılması ve toplumsal cinsiyet eşitliğin sağlanmasına yardımcı olur. Ayrıca nerede olursa olsun insanların daha sağlıklı ve sürdürülebilir yaşamları olmasını sağlar. Eğitim aryıca hoşgörünün gelişmesi ve barışcıl toplumların inşasına da destek olur.",
      "Thanks to your donations we provide stationary items, medicalsupport, uniforms, nutritious food and etc. to the children who cannot afford them":"Bağışlarınız sayesinde çocukların kırtasiye eşyaları, sağlık hizmetleri, üniformalar, besleyici gıdalar vb. ihtiyaçları karşılanıyor.",
      "Donate":"Bağış Yap",
      "Volunteer for children and be a part of our non-profit foundation. Help us to give children a quality education which is their right.":"Gönüllü olarak kâr gütmeyen vakfımıza katılın ve çocuklara nitelikli eğitim vermemize yardımcı olun.",
      "Our partners":"Partnerlerimiz",
      "Latest Donations":"Son Yapılan Bağışlar",
      "donated":"bağış yaptı",


      "You are about to change a child's life!":"Bir çocuğun hayatını değiştirmek üzeresin!",
      "Amount of money":"Bağış miktarı",
      "Your Info":"Bilgileriniz",
      "Name":"Adınız",
      "Your name":"Adınızı yazınız",
      "Surname":"Soyadınız",
      "Your surname":"Soyadınızı yazınız",
      "Email address":"Email adresiniz",
      "Enter email":"Email adresinizi giriniz",
      "Phone Number":"Telefon numaranız",
      "Phone number here":"Telefon numaranızı giriniz",
      "Address":"Adresiniz",
      "Your address here":"Adresinizi giriniz",
      "Please select a donate type":"Bağış tipini seçiniz",
      "Go to Payment":"Ödemeye geçin",

      "Card Number":"Kart Numarası",
      "Full Name":"Kart Üzerindeki İsim",
      "MM/YY":"AA/YY",
      "Thanks for your donation!":"Bağışınız için teşekkürler!",
      "You can be sure this money will be used to change a life of a child.":"Bu paranın bir çocuğun hayatının değişmesi için kullanılacağından şüpheniz olmasın.",
      "Pay":"Öde",

      "Your name here":"Adınızı yazınız",
      "Your surname here":"Soyadınızı yazınız",
      "Date of Birth":"Doğum tarihiniz",
      "Why do you wanna be part of us?":"Neden bize katılmak istiyorsunuz?",
      "Explain your reasons":"Sebebiniz",
      "Gender":"Cinsiyet",
      "Select Gender":"Cinsiyetinizi seçiniz",
      "Male":"Erkek",
      "Female":"Kadın",
      "Prefer not to say":"Söylemek istemiyorum",
      "Thanks for deciding to join us! Help us to grow our team and lets provide quality education to every children we can reach.":"Bize katılmak istediğin için teşekkür ederiz! Büyümemize yardımcı ol ve ulaşabildiğimiz her çocuğa nitelikli bir eğitim kazandıralım.",
      "Register":"Başvur",
      "Registration":"Başvuru Formu",
      "TR":"ENG"


    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;