
/*
describe('Class: name of test', function () {
    it('does stuff', function () {
        // code + https://github.com/pivotal/jasmine/wiki/Matchers
        expect(returned_type).toEqual("testEntity");
    });
});

*/


//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//
describe('TheDOM', function () {

    it('Uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        var theCanvas = $("#theCanvas");
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    })

});




//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//
describe('CanvasManager', function () {

    it('Retrieves and stores a local this.context from the TheDOM class', function () {
        var cm = new CanvasManager();
        expect(cm.context).toBeDefined();
    }),

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var cm = new CanvasManager();
        var testX = 25, testY = 50;

        var ctrl = new Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = cm.getViewRelativeX(ctrl);
        var relY = cm.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    })

});


//************************************************************************************//
// Test suite for Controller and Entity classes
//************************************************************************************//
describe('Controller - entity management', function () {

    it('Adds an entity to the managed collection that can be retrieved by Entity ID', function () {
        var entity_id = 'entId1';
        var entity1 = new Entity(null, entity_id);
        entity1.type = "testEntity";
        var controller1 = new Controller();

        controller1.addEntity(entity1);
        var entity2 = controller1.getEntityById(entity_id);
        var returned_type = entity2.type;

        expect(returned_type).toEqual("testEntity");
    }),

    it('Sorts the managed collection of Entity objects in descending order by depth (largest = deepest first)', function () {
        var ctrl = new Controller();
        var ent1 = new Entity(null, "e1");
        ctrl.addEntity(ent1);
        ent1.depth = 50;
        var ent2 = new Entity(null, "e2");
        ent2.depth = 100;
        ctrl.addEntity(ent2);
        var ent3 = new Entity(null, "e3");
        ent3.depth = -10;
        ctrl.addEntity(ent3);
        var ent4 = new Entity(null, "e4");
        ent4.depth = 20;
        ctrl.addEntity(ent4);

        // do the sort
        ctrl.sortEntities();
        var sortedEntities = ctrl.getEntities();

        expect(sortedEntities[0].id).toEqual("e2");
        expect(sortedEntities[1].id).toEqual("e1");
        expect(sortedEntities[2].id).toEqual("e4");
        expect(sortedEntities[3].id).toEqual("e3");
    })

});

    