import { Link } from "react-router-dom";
import { BookButton, BookButton2 } from "../Styled/Button";
import { HeaderDiv, IMG } from "../Styled/Nav";
import homeImg from '../../images/header.jpeg';
import coffeeImg from '../../images/coffe.jpg';
import fruitBowlImg from '../../images/fruitBowl.jpg';
import { H1, H2, H3, Quote } from "../Styled/Headings";
import { CoffeeImg, FruitBowlImg, MenuSection, Section } from "../Styled/Section";

export function Home(){
    return(<>
        <HeaderDiv>
            <IMG src={homeImg}></IMG>
            <H1>Brunch Blessed</H1>
            <Quote>~ only the best is good enough ~</Quote>
            <BookButton>
                <Link to="/react-restaurant/bokning"><span>Boka bord</span></Link>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </BookButton>
        </HeaderDiv>

        <Section>
            <H2>~ Vår meny ~</H2>
            <article>
                <MenuSection className="bowls">
                    <FruitBowlImg src={fruitBowlImg}></FruitBowlImg>
                    <H3>~ Bowls ~</H3>
                    <h4>Acai bowl</h4>
                    <p>Smoothie bowl topped with home made granola, fresh berries, fruit and peanut butter.</p>
                    <h4>Fruit bowl</h4>
                    <p>Bowl with fresh fruits of the day.</p>
                </MenuSection>
                <MenuSection className="panncakes">
                    <H3>~ Pancakes ~</H3>
                    <h4>Blueberry and lemon! </h4>
                    <p>Blueberry compote, lemoncurd, cream cheese frosting, candied pecans</p>
                    <h4>Chocolate, banana and caramel! </h4>
                    <p>Milk chocolate fluff, sliced bananas, salted caramel, shredded dark chocolate, honeycomb </p>
                    <h4>Bacon</h4>
                    <p>Bacon and Canadian maple syrup</p>
                    <h4>Plain</h4>
                    <p>Pancakes with Canadian maple syrup</p>
                </MenuSection>
                <MenuSection className="brunch">
                    <H3>~ Brunch ~</H3>
                    <h4>Eggs benedict</h4>
                    <p>A brunch classic! 2 brioche buns, 2 poached eggs, hollandaise sauce and your choice of bacon, smoked salmon or spinach</p>
                    <h4>Smashed avocado</h4>
                    <p>Avocado mash on toasted sourdough with herb oil, chili flakes, pickled red onion, chives, seeds</p>
                    <h4>Toasted bagel</h4>
                    <p>changes monthly, check specials menu for filling and price!</p>
                    <h4>Egg bun</h4>
                    <p>Brioche bun filled with folded eggs, cheddar, smoked cream cheese, mayo, caramelized onions, sliced tomato. Choose bacon or avocado</p>
                </MenuSection>
                <MenuSection className="drinks">
                    <CoffeeImg src={coffeeImg}></CoffeeImg>
                    <H3>~ Drinks ~</H3>
                    <h4>Doubble espresso</h4>
                    <h4>Cappucciono</h4>
                    <h4>Latte</h4>
                    <h4>Chai latte</h4>
                    <h4>Matcha latte</h4>
                    <h4>Hot chocolate</h4>
                </MenuSection>
            </article>
        </Section>

        <Section>
            <H2>~ Öppettider ~</H2>
            <H3>Måndag - Söndag</H3>
            <h4>12:00 - 14:00</h4>

            <BookButton2>
                <Link to="/react-restaurant/bokning"><span>Boka bord</span></Link>
                <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg>
            </BookButton2>
        </Section>
    </>)
}

export default Home