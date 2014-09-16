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

    it('Adds an entity to the managed collection that can be retrieved by Entity ID', function () {
        var entity_id = 'entId1';
        var entity1 = new Entity(null, entity_id);
        entity1.type = "testEntity";

        testController.addEntity(entity1);
        var entity2 = testController.getEntityById(entity_id);
        var returned_type = entity2.type;

        expect(returned_type).toEqual("testEntity");
    }),

    it('Sorts the managed collection of Entity objects in descending order by depth (largest = deepest first)', function () {
        var ent1 = new Entity(null, "e1");
        testController.addEntity(ent1);
        ent1.depth = 50;
        var ent2 = new Entity(null, "e2");
        ent2.depth = 100;
        testController.addEntity(ent2);
        var ent3 = new Entity(null, "e3");
        ent3.depth = -10;
        testController.addEntity(ent3);
        var ent4 = new Entity(null, "e4");
        ent4.depth = 20;
        testController.addEntity(ent4);

        // do the sort
        testController.sortEntities();
        var sortedEntities = testController.getEntities();

        expect(sortedEntities[0].id).toEqual("e2");
        expect(sortedEntities[1].id).toEqual("e1");
        expect(sortedEntities[2].id).toEqual("e4");
        expect(sortedEntities[3].id).toEqual("e3");
    }),

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
    })

    // TODO: enhance test to check for clicking on multiple entities
    it('Passes on-click coordinates to the clicked-on entity/entities', function () {
        var ent1 = new Entity(null, 'ent1');
        ent1.setSize(100, 100);
        ent1.x = 50;
        ent1.y = 50;
        testController.addEntity(ent1);

        var mockClickEvent = { pageX: 60, pageY: 80 };

        // the spy
        spyOn(ent1, 'mousedown')

        // force a call to click()
        testController.mousedown(mockClickEvent);

        expect(ent1.mousedown).toHaveBeenCalled();
    })
});