/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Controller.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Entity.js" />
//************************************************************************************//
// Test suite for Controller class
//************************************************************************************//
describe('Controller', function () {
    var testController;

    beforeEach(function () {
        testController = new Controller();
    });

    it('Has a defined View property upon instantiation', function () {
        expect(testController.view).toBeDefined();
    });

    it('Calls its own post-step method at the end of each step.', function () {
        spyOn(testController, 'postStep');
        testController.step();
        expect(testController.postStep).toHaveBeenCalled();
    });

    // TODO: enhance test to check for clicking on multiple entities
    it('Passes on-click coordinates to the clicked-on entity/entities', function () {
        var ent1 = new Entity(null, 'ent1');
        ent1.setSize(100, 100);
        ent1.setPosition(50, 50);
        testController.addEntity(ent1);

        var mockClickEvent = { pageX: 60, pageY: 80 };

        // the spy
        spyOn(ent1, 'mousedown')

        // force a call to click()
        testController.mousedown(mockClickEvent);

        expect(ent1.mousedown).toHaveBeenCalled();
    });

    it('Adds an entity to the managed collection that can be retrieved by Entity ID', function () {
        var entity1 = new Entity(null, 'entId1');
        entity1.type = "testEntity";

        testController.addEntity(entity1);
        var entity2 = testController.getEntityById('entId1');
        var returned_type = entity2.type;

        expect(returned_type).toEqual("testEntity");
    });

    it('Retrieves all managed Entity objects with a particular type.', function () {
        testController.addEntity(new Entity('blue', 100));
        testController.addEntity(new Entity('blue', 101));
        testController.addEntity(new Entity('red', 102));
        testController.addEntity(new Entity('green', 103));

        var redOnes = testController.getEntitiesByType('red');
        var blueOnes = testController.getEntitiesByType('blue');

        expect(redOnes.length).toEqual(1);
        expect(blueOnes.length).toEqual(2);
        expect(blueOnes[0].type).toEqual(blueOnes[1].type);
    });

    it('Sorts the managed collection of Entity objects in descending order by depth (largest = deepest first)', function () {
        var ent1 = new Entity(null, 'e1');
        testController.addEntity(ent1);
        ent1.depth = 50;
        var ent2 = new Entity(null, 'e2');
        ent2.depth = 100;
        testController.addEntity(ent2);
        var ent3 = new Entity(null, 'e3');
        ent3.depth = -10;
        testController.addEntity(ent3);
        var ent4 = new Entity(null, 'e4');
        ent4.depth = 20;
        testController.addEntity(ent4);

        // do the sort
        testController.sortEntities();
        var sortedEntities = testController.getEntities();

        expect(sortedEntities[0].id).toEqual("e2");
        expect(sortedEntities[1].id).toEqual("e1");
        expect(sortedEntities[2].id).toEqual("e4");
        expect(sortedEntities[3].id).toEqual("e3");
    });

    it('Removes destroyed Entity objects from the managed collection', function () {
        // start with five
        testController.addEntity(new Entity(null, 'ent1'));
        testController.addEntity(new Entity(null, 'ent2'));
        testController.addEntity(new Entity(null, 'ent3'));
        testController.addEntity(new Entity(null, 'ent4'));
        testController.addEntity(new Entity(null, 'ent5'));

        // destroy two
        testController.getEntityById('ent2').destroy();
        testController.getEntityById('ent5').destroy();

        // remove from the Controller
        testController.removeDestroyedEntities();

        expect(testController.entities.length).toEqual(3);
    });



    it('Finds a collection of Entity objects at a given (x, y) position', function () {
        var ent1 = new Entity(null, 'ent1');
        ent1.setSize(50, 50);
        ent1.setPosition(50, 50);
        testController.addEntity(ent1);

        var ent2 = new Entity(null, 'ent2');
        ent2.setSize(50, 50);
        ent2.setPosition(75, 75);
        testController.addEntity(ent2);

        var entsAtPos1 = testController.getEntitiesAtPosition(60, 60);
        expect(entsAtPos1.length).toEqual(1);

        var entsAtPos2 = testController.getEntitiesAtPosition(90, 90);
        expect(entsAtPos2.length).toEqual(2);

        var entsAtPos3 = testController.getEntitiesAtPosition(30, 30);
        expect(entsAtPos3.length).toEqual(0);
    });
});