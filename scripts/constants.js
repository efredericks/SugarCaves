/** GLOBALS **/
const NUM_FRIENDS = 4;
const WIDTH = 10;
const HEIGHT = 10;
const ROOM_TYPES = {
	NORMAL: 0,
	OPEN: 1,
	TIGHT: 2,
	STREAM: 3,
	POOL: 4,
	VOID: 5,
	ROCKY: 6,
	STALAGS: 7,
};
Object.freeze(ROOM_TYPES);

/* Helpers */
function randomInt(min, max) {  
  return Math.floor(Math.random()*(max-min)+min);
} 

/**** FROM CORPORA ****/
// From https://github.com/dariusk/corpora/
var firstNames = [
    "Aaliyah",
    "Aaron",
    "Abby",
    "Abigail",
    "Abraham",
    "Adam",
    "Addison",
    "Adrian",
    "Adriana",
    "Adrianna",
    "Aidan",
    "Aiden",
    "Alan",
    "Alana",
    "Alejandro",
    "Alex",
    "Alexa",
    "Alexander",
    "Alexandra",
    "Alexandria",
    "Alexia",
    "Alexis",
    "Alicia",
    "Allison",
    "Alondra",
    "Alyssa",
    "Amanda",
    "Amber",
    "Amelia",
    "Amy",
    "Ana",
    "Andrea",
    "Andres",
    "Andrew",
    "Angel",
    "Angela",
    "Angelica",
    "Angelina",
    "Anna",
    "Anthony",
    "Antonio",
    "Ariana",
    "Arianna",
    "Ashley",
    "Ashlyn",
    "Ashton",
    "Aubrey",
    "Audrey",
    "Austin",
    "Autumn",
    "Ava",
    "Avery",
    "Ayden",
    "Bailey",
    "Benjamin",
    "Bianca",
    "Blake",
    "Braden",
    "Bradley",
    "Brady",
    "Brandon",
    "Brayden",
    "Breanna",
    "Brendan",
    "Brian",
    "Briana",
    "Brianna",
    "Brittany",
    "Brody",
    "Brooke",
    "Brooklyn",
    "Bryan",
    "Bryce",
    "Bryson",
    "Caden",
    "Caitlin",
    "Caitlyn",
    "Caleb",
    "Cameron",
    "Camila",
    "Carlos",
    "Caroline",
    "Carson",
    "Carter",
    "Cassandra",
    "Cassidy",
    "Catherine",
    "Cesar",
    "Charles",
    "Charlotte",
    "Chase",
    "Chelsea",
    "Cheyenne",
    "Chloe",
    "Christian",
    "Christina",
    "Christopher",
    "Claire",
    "Cody",
    "Colby",
    "Cole",
    "Colin",
    "Collin",
    "Colton",
    "Conner",
    "Connor",
    "Cooper",
    "Courtney",
    "Cristian",
    "Crystal",
    "Daisy",
    "Dakota",
    "Dalton",
    "Damian",
    "Daniel",
    "Daniela",
    "Danielle",
    "David",
    "Delaney",
    "Derek",
    "Destiny",
    "Devin",
    "Devon",
    "Diana",
    "Diego",
    "Dominic",
    "Donovan",
    "Dylan",
    "Edgar",
    "Eduardo",
    "Edward",
    "Edwin",
    "Eli",
    "Elias",
    "Elijah",
    "Elizabeth",
    "Ella",
    "Ellie",
    "Emily",
    "Emma",
    "Emmanuel",
    "Eric",
    "Erica",
    "Erick",
    "Erik",
    "Erin",
    "Ethan",
    "Eva",
    "Evan",
    "Evelyn",
    "Faith",
    "Fernando",
    "Francisco",
    "Gabriel",
    "Gabriela",
    "Gabriella",
    "Gabrielle",
    "Gage",
    "Garrett",
    "Gavin",
    "Genesis",
    "George",
    "Gianna",
    "Giovanni",
    "Giselle",
    "Grace",
    "Gracie",
    "Grant",
    "Gregory",
    "Hailey",
    "Haley",
    "Hannah",
    "Hayden",
    "Hector",
    "Henry",
    "Hope",
    "Hunter",
    "Ian",
    "Isaac",
    "Isabel",
    "Isabella",
    "Isabelle",
    "Isaiah",
    "Ivan",
    "Jack",
    "Jackson",
    "Jacob",
    "Jacqueline",
    "Jada",
    "Jade",
    "Jaden",
    "Jake",
    "Jalen",
    "James",
    "Jared",
    "Jasmin",
    "Jasmine",
    "Jason",
    "Javier",
    "Jayden",
    "Jayla",
    "Jazmin",
    "Jeffrey",
    "Jenna",
    "Jennifer",
    "Jeremiah",
    "Jeremy",
    "Jesse",
    "Jessica",
    "Jesus",
    "Jillian",
    "Jocelyn",
    "Joel",
    "John",
    "Johnathan",
    "Jonah",
    "Jonathan",
    "Jordan",
    "Jordyn",
    "Jorge",
    "Jose",
    "Joseph",
    "Joshua",
    "Josiah",
    "Juan",
    "Julia",
    "Julian",
    "Juliana",
    "Justin",
    "Kaden",
    "Kaitlyn",
    "Kaleb",
    "Karen",
    "Karina",
    "Kate",
    "Katelyn",
    "Katherine",
    "Kathryn",
    "Katie",
    "Kayla",
    "Kaylee",
    "Kelly",
    "Kelsey",
    "Kendall",
    "Kennedy",
    "Kenneth",
    "Kevin",
    "Kiara",
    "Kimberly",
    "Kyle",
    "Kylee",
    "Kylie",
    "Landon",
    "Laura",
    "Lauren",
    "Layla",
    "Leah",
    "Leonardo",
    "Leslie",
    "Levi",
    "Liam",
    "Liliana",
    "Lillian",
    "Lilly",
    "Lily",
    "Lindsey",
    "Logan",
    "Lucas",
    "Lucy",
    "Luis",
    "Luke",
    "Lydia",
    "Mackenzie",
    "Madeline",
    "Madelyn",
    "Madison",
    "Makayla",
    "Makenzie",
    "Malachi",
    "Manuel",
    "Marco",
    "Marcus",
    "Margaret",
    "Maria",
    "Mariah",
    "Mario",
    "Marissa",
    "Mark",
    "Martin",
    "Mary",
    "Mason",
    "Matthew",
    "Max",
    "Maxwell",
    "Maya",
    "Mckenzie",
    "Megan",
    "Melanie",
    "Melissa",
    "Mia",
    "Micah",
    "Michael",
    "Michelle",
    "Miguel",
    "Mikayla",
    "Miranda",
    "Molly",
    "Morgan",
    "Mya",
    "Naomi",
    "Natalia",
    "Natalie",
    "Nathan",
    "Nathaniel",
    "Nevaeh",
    "Nicholas",
    "Nicolas",
    "Nicole",
    "Noah",
    "Nolan",
    "Oliver",
    "Olivia",
    "Omar",
    "Oscar",
    "Owen",
    "Paige",
    "Parker",
    "Patrick",
    "Paul",
    "Payton",
    "Peter",
    "Peyton",
    "Preston",
    "Rachel",
    "Raymond",
    "Reagan",
    "Rebecca",
    "Ricardo",
    "Richard",
    "Riley",
    "Robert",
	  "Robb",
    "Ruby",
    "Ryan",
    "Rylee",
    "Sabrina",
    "Sadie",
    "Samantha",
    "Samuel",
    "Sara",
    "Sarah",
    "Savannah",
    "Sean",
    "Sebastian",
    "Serenity",
    "Sergio",
    "Seth",
    "Shane",
    "Shawn",
    "Shelby",
    "Sierra",
    "Skylar",
    "Sofia",
    "Sophia",
    "Sophie",
    "Spencer",
    "Stephanie",
    "Stephen",
    "Steven",
    "Summer",
    "Sydney",
    "Tanner",
    "Taylor",
    "Thomas",
    "Tiffany",
    "Timothy",
    "Travis",
    "Trenton",
    "Trevor",
    "Trinity",
    "Tristan",
    "Tyler",
    "Valeria",
    "Valerie",
    "Vanessa",
    "Veronica",
    "Victor",
    "Victoria",
    "Vincent",
    "Wesley",
    "William",
    "Wyatt",
    "Xavier",
    "Zachary",
    "Zoe",
    "Zoey"
];
